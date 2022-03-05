import { Controller } from "../controller/controller";
import { random } from "../utils";
import { Shield } from "./shield";
import { Weapon } from "./weapon";

export class Character {

    readonly name: string
    readonly controller: Controller;

    hp: number;
    defence: number;
    power: number;

    weapon?: Weapon = undefined;
    shield?: Shield = undefined;

    private eqiuped: boolean = false

    constructor(controller: Controller, name: string, hp: number, defence: number, power: number) {
        this.controller = controller
        this.name = name
        this.hp = hp
        this.defence = defence
        this.power = power
    }

    attack(enemy: Character): string {
        if (random(1, 4) !== 1) {
            let damage = this.damage()
            enemy.takeDamage(damage)
            return `${this.name} attacking ${enemy.name}. Damage ${damage}`
        }
        else {
            return `${this.name} missing attack`
        }
    }

    defend(): string {
        if (this.eqiupShield()) {
            return "Shield eqiuped. defence: " + this.defence
        }
        else {
            return 'Shield already eqiuped.'
        }
    }

    skip(): string {
        return "passing"
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

    takeDamage(damage: number): number {
        this.hp -= damage - this.defence
        return (damage - this.defence)
    }

    details(): string {
        return `\nДетали ${this.name}: \n hp:      ${this.hp}\n defence: ${this.defence}\n power:   ${this.power}\n weapon:  ${this.weapon}\n shield:  ${this.shield}\n`
    }
}