import { Action } from "./action";

export const skip: Action = async (character, enemy) => {
    await character.io.send("Skipped")
    await enemy.io.send(character.name + " skipped.")
    return true
}