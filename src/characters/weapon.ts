export interface Weapon {
    readonly name: string,
    readonly damage: number
}

export class Sword implements Weapon {
    name: string = "Sword";
    damage: number = 100;
}