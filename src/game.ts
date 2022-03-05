import { IronShield } from './characters/shield';
import { Sword } from './characters/weapon';
import { Character } from './characters/character';
import { random } from './utils';
import { Controller } from './controller/controller';

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

    constructor(id: number, heroController: Controller, dragonController: Controller) {
        this.id = id
        this.hero = new Character(heroController, 'Artur', 700, 100, 75)
        this.hero.weapon = new Sword()
        this.hero.shield = new IronShield()
        this.dragon = new Character(dragonController, 'Dragone', 1500, 100, 250)
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

            let command = await character.controller.next('Your side: ')
            let action  = actions.get(command)

            if (action === undefined) {
                await character.controller.say('Error: cannot find command ' + command)
                return false
            }
            else {
                await action.execute(character, enemy)
                return true
            }
        }
        else {
            await character.controller.say('You lose :(')
            await enemy.controller.say('You win! :)')

            await this.stopGame()

            return true;
        }
    }

    async stopGame(): Promise<void> { 
        this.running = false 
    }

    private async skip(character: Character, enemy: Character) {
        await character.controller.say("Skipped")
        await enemy.controller.say(character.name + " skipped.")
    }

    private async defend(character: Character, enemy: Character) {
        if (character.eqiupShield()) {
            await character.controller.say("Shield eqiuped.")
        }
        else {
            await character.controller.say("Shield already eqiuped.")
        }
        await enemy.controller.say(character.name + " defends.")
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
        await this.hero.controller.say(message)
        await this.dragon.controller.say(message)
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