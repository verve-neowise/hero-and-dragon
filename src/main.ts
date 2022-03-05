import { AIController, IOController } from "./controller/controller";
import { Game } from "./game";
import { ConsoleIO } from "./io/console.io";

let io = new ConsoleIO()
let hero = new IOController(io)
let dragone = new AIController()

let game = new Game(1, hero, dragone)

game.start()