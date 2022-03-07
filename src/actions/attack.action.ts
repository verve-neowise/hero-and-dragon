import { random } from "../utils";
import { Action, sendFor } from "./action";

export const attack: Action = async (character, enemy) => {

    if (probability(75)) {
        let damage = enemy.takeDamage(character.damage())
        await sendFor(`${character.name} attacking ${enemy.name}. Damage ${damage}`, character, enemy)
    }
    else {
        await sendFor(`${character.name} missing attack`, character, enemy)
    }
    return true
}

const probability = (persentage: number) => {
    return random(0, persentage) < persentage
}