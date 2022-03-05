import { Hero } from './characters/hero.character';
import { IronShield } from './characters/shield';
import { Sword } from './characters/weapon';
import { Character } from './characters/character';
import { random } from './utils';
import { Controller } from './controller/controller';

type action = (first: Character, second: Character) => Promise<void>

export class Game {

    readonly id: number

    private hero: Hero
    private dragon: Hero

    private game = 1

    private running = true

    constructor(id: number, heroController: Controller, dragonController: Controller) {
        this.id = id
        this.hero = new Hero(heroController, 'Artur', 700, 100, 75)
        this.hero.weapon = new Sword()
        this.hero.shield = new IronShield()
        this.dragon = new Hero(dragonController, 'Dragone', 1500, 100, 120)
    }

    async start() {

        const actions = new Map<string, action>([
            ['1', this.attack],
            ['2', this.defend],
            ['3', this.skip],
        ])

        await this.sendForAll('Starting game #' + this.id)

        while(this.running) {
            await this.activate(this.hero, this.dragon, actions)
            await this.activate(this.dragon, this.hero, actions)
        }
    }

    async activate(character: Character, enemy: Character, actions: Map<string, action>) {
        
        await this.sendForAll(this.information()) 

        if (character.alive()) {
            let command = await character.controller.next('Your side: ')
            let action  = actions.get(command)

            if (action === undefined) {
                await character.controller.say('Error: cannot find command ' + command)
            }
            else {
                await action(character, enemy)
            }
        }
        else {
            await character.controller.say('You lose :(')
            await enemy.controller.say('You win! :)')

            await this.stopGame()
        }
    }

    async stopGame(): Promise<void> {  }

    async skip(character: Character, enemy: Character) {
        await character.controller.say("Skipped")
        await enemy.controller.say(character.name + " skipped.")
    }

    async defend(character: Character, enemy: Character) {
        if (character.eqiupShield()) {
            await character.controller.say("Shield eqiuped.")
            await enemy.controller.say(character.name + " defends.")
        }
        else {
            await character.controller.say("Shield already eqiuped.")
        }
    }

    async attack(character: Character, enemy: Character) {
        if (random(1, 4) !== 1) {
            let damage = character.damage()
            enemy.takeDamage(damage)
            await this.sendForAll(`${character.name} attacking ${enemy.name}. Damage ${damage}`)
        }
        else {
            await this.sendForAll(`${character.name} missing attack`)
        }
    }

    async sendForAll(message: string) {
        await this.hero.controller.say(message)
        await this.dragon.controller.say(message)
    }

    information() {
        return (
        `----------- ${this.game} ------------
        Герой: "  + ${this.hero.hp}
        Дракон: " + ${this.dragon.hp}
        `)
    }

    help() {
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