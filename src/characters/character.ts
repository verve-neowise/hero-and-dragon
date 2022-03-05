import { Controller } from "../controller/controller";
import { Weapon } from "./weapon";

export interface Character {

    readonly name: string
    readonly controller: Controller
    
    hp:      number,
    defence: number,
    power:   number,
    weapon?:  Weapon


    takeDamage(damage: number) : boolean

    attack(enemy: Character): string

    defend(): string

    damage() : number

    skip(): string

    alive(): boolean

    details() : string

    eqiupShield(): boolean

    removeShield(): void
}