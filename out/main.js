"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ai_controller_1 = require("./controller/ai.controller");
const console_controller_1 = require("./controller/console.controller");
const game_1 = require("./game");
const console_io_1 = require("./io/console.io");
let io = new console_io_1.ConsoleIO();
let hero = new console_controller_1.ConsoleController(io);
let dragone = new ai_controller_1.AIController();
let game = new game_1.Game(1, hero, dragone);
game.start();
