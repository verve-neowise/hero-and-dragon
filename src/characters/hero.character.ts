import { Character } from "./character";
import { Shield } from "./shield";
import { Weapon } from "./weapon";

export class Hero implements Character {

    readonly name: string

    hp: number;
    defence: number;
    power: number;
    
    weapon?: Weapon = undefined;
    shield?: Shield = undefined;

    private eqiuped: boolean = false

    constructor(name: string, hp: number, defence: number, power: number) {
        this.name = name
        this.hp = hp
        this.defence = defence
        this.power = power
    }

    eqiupShield(): boolean {
        if (this.shield && !this.eqiuped) {
            this.defence += this.shield.defence
            this.eqiuped = true
            return true
        }
        else {
            return false
        }
    }

    removeShield() {
        if (this.shield && this.eqiuped) {
            this.defence -= this.shield.defence
            this.eqiuped = false
            return true
        }
        else {
            return false
        }
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
        return `\nДетали ${this.name}: \n hp:      ${this.hp}\n defence: ${this.defence}\n power:   ${this.power}\n weapon:  ${this.weapon}\n shield:  ${this.shield}\n`
    }
}