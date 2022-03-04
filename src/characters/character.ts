import { Weapon } from "./weapon";

export interface Character {
    
    hp:      number,
    defence: number,
    power:   number,
    weapon?:  Weapon

    takeDamage(damage: number) : boolean

    alive(): boolean

    damage() : number

    details() : string
}