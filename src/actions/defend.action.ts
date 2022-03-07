import { Action } from "./action";

export const defend: Action = async (character, enemy) => {
    if (character.eqiupShield()) {
        await character.io.send("Shield eqiuped.")
    }
    else {
        await character.io.send("Shield already eqiuped.")
    }
    await enemy.io.send(character.name + " defends.")

    return true
}