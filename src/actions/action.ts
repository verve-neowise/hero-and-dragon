import { Character } from "../characters/character";

// do action with character and 
// return: may be game action or character action
export type Action = (character: Character, enemy: Character) => Promise<boolean> 

export const sendFor = async (message: string, ...characters: Character[]) => {
    characters.forEach( async (character) => {
        character.io.send(message)
    })
}