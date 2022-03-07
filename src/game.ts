import { Action, sendFor } from './actions/action';
import { attack } from './actions/attack.action';
import { defend } from './actions/defend.action';
import { skip } from './actions/skip.action';
import { Character } from './characters/character';

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
            ['1', attack],
            ['2', defend],
            ['3', skip],
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

            character.update()

            let command = await character.io.ask('Your side: ')
            let action  = actions.get(command)

            if (action === undefined) {
                await character.io.send('Error: cannot find command ' + command)
                return false
            }
            else {
                return action(character, enemy)
            }
        }
        else {
            await character.io.send('You lose :(')
            await enemy.io.send('You win! :)')

            await this.stopGame()

            return true
        }
    }

    async stopGame(): Promise<void> { 
        this.running = false 
    }

    private async sendForAll(message: string) {
        await sendFor(message, this.hero, this.dragon)
    }

    private information() {
        return (
        `----------- ${this.game + 1} ------------
${this.hero.name}:    ${this.hero.hp}
${this.dragon.name}:  ${this.dragon.hp}`)
    }

    // private help() {
    //     return (
    //     `Помощь
    //         -------- Игра -----------
    //         ?      ->  список комманд
    //         h      ->  данные героя
    //         d      ->  данные Дракона
    //         \n-------- Герой -----------
    //         1      ->  Атаковать
    //         2      ->  Защита
    //         3      ->  Пропустить ход
    //         q   ->  Убежать
    //     `)
    // }
}