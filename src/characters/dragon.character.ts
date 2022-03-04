import { Character } from "./character";
import { Weapon } from "./weapon";

export class Dragon implements Character {

    readonly name: string

    hp: number;
    defence: number;
    power: number;
    
    weapon?: Weapon = undefined;

    constructor(name: string, hp: number, defence: number, power: number) {
        this.name = name
        this.hp = hp
        this.defence = defence
        this.power = power
    }

    alive(): boolean {
        return this.hp > 0
    }

    damage(): number {
        return this.power + (this.weapon ? this.weapon.damage : 0)
    }

    takeDamage(damage: number): boolean {
        this.hp -= damage
        return this.alive()
    }

    details(): string {
        return `\nДетали Дракона (${this.name}): \n hp:      ${this.hp}\n defence: ${this.defence}\n power:   ${this.power}\n weapon:  ${this.weapon}\n`
    }
}