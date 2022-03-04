import { Dragon } from './characters/dragon.character';
import { Hero } from './characters/hero.character';
import { IronShield } from './characters/shield';
import { Sword } from './characters/weapon';
import { exit } from 'process';
import { random } from './utils';
import { IO } from './io/io';
import { Character } from './characters/character';

export class Game {

    readonly id: number

    private readonly io: IO

    private hero = new Hero('Artur', 700, 100, 75)
    private dragon = new Dragon('Dragone', 1500, 100, 120)
    
    private game = 1

    private running = true

    constructor(id: number, io: IO) {
        this.id = id
        this.io = io
        this.hero.weapon = new Sword()
        this.hero.shield = new IronShield()
    }

    async start() {
        while(this.running) {

        }
    }

    async detailsOf(character: Character) {
        await this.io.send(character.details())
    }

    async information() {
        await this.io.send(
        `----------- ${this.game} ------------
        Герой: "  + ${this.hero.hp}
        Дракон: " + ${this.dragon.hp}
        `)
    }

    async help() {
        await this.io.send(
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