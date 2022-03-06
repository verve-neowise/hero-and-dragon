import { Character } from './characters/character';
import { random } from './utils';

class Action {

    constructor(private _execution: (first: Character, second: Character) => Promise<void>) {}

    async execute(first: Character, second: Character) {
        await this._execution(first, second)
    }
}

export class Game {

    readonly id: number

    private hero: Character
    private dragon: Character

    private game = 0

    private running = true

    constructor(id: number, hero: Character, dragon: Character) {
        this.id = id
        this.hero = hero
        this.dragon = dragon
    }

    async start() {

        const actions = new Map<string, Action>([
            ['1', new Action((first, second) => this.attack(first, second))],
            ['2', new Action((first, second) => this.defend(first, second))],
            ['3', new Action((first, second) => this.skip(first, second))],
        ])

        await this.sendForAll('Starting game #' + this.id)

        let parts = [
            [this.hero, this.dragon],
            [this.dragon, this.hero],
        ]

        while(this.running) {
            
            await this.sendForAll(this.information())

            for(let i = 0; i < parts.length && this.running; ) {

                if (await this.activate(parts[i], actions)) {
                    i++
                }
            }
        }
    }

    private async activate([character, enemy]: Character[], actions: Map<string, Action>): Promise<boolean> {
        
        if (character.alive()) {

            character.removeShield()

            let command = await character.io.ask('Your side: ')
            let action  = actions.get(command)

            if (action === undefined) {
                await character.io.send('Error: cannot find command ' + command)
                return false
            }
            else {
                await action.execute(character, enemy)
                return true
            }
        }
        else {
            await character.io.send('You lose :(')
            await enemy.io.send('You win! :)')

            await this.stopGame()

            return true;
        }
    }

    async stopGame(): Promise<void> { 
        this.running = false 
    }

    private async skip(character: Character, enemy: Character) {
        await character.io.send("Skipped")
        await enemy.io.send(character.name + " skipped.")
    }

    private async defend(character: Character, enemy: Character) {
        if (character.eqiupShield()) {
            await character.io.send("Shield eqiuped.")
        }
        else {
            await character.io.send("Shield already eqiuped.")
        }
        await enemy.io.send(character.name + " defends.")
    }

    private async attack(character: Character, enemy: Character) {
        if (random(1, 4) !== 1) {
            let damage = enemy.takeDamage(character.damage())
            await this.sendForAll(`${character.name} attacking ${enemy.name}. Damage ${damage}`)
        }
        else {
            await this.sendForAll(`${character.name} missing attack`)
        }
    }

    private async sendForAll(message: string) {
        await this.hero.io.send(message)
        await this.dragon.io.send(message)
    }

    private information() {
        return (
        `----------- ${this.game + 1} ------------
${this.hero.name}:    ${this.hero.hp}
${this.dragon.name}:  ${this.dragon.hp}`)
    }

    private help() {
        return (
        `Помощь
            -------- Игра -----------
            ?      ->  список комманд
            h      ->  данные героя
            d      ->  данные Дракона
            \n-------- Герой -----------
            1      ->  Атаковать
            2      ->  Защита
            3      ->  Пропустить ход
            q   ->  Убежать
        `)
    }
}