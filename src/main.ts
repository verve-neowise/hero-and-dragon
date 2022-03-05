import { AIController } from "./controller/ai.controller";
import { ConsoleController } from "./controller/console.controller";
import { Game } from "./game";
import { ConsoleIO } from "./io/console.io";

let io = new ConsoleIO()
let hero = new ConsoleController(io)
let dragone = new AIController()

let game = new Game(1, hero, dragone)

game.start()