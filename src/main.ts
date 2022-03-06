import { Character } from "./characters/character";
import { Game } from "./game";
import { AiIO } from "./io/ai.io";
import { ConsoleIO } from "./io/console.io";

let hero = new Character(new ConsoleIO(), 'Artur', 700, 120, 50)
let dragone = new Character(new AiIO(), 'Dragone', 1500, 100, 120)

let game = new Game(1, hero, dragone)

game.start()