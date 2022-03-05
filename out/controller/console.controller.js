"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleController = void 0;
class ConsoleController {
    constructor(io) {
        this.io = io;
    }
    async next(message) {
        return this.io.ask(message);
    }
    async say(message) {
        return this.io.send(message);
    }
}
exports.ConsoleController = ConsoleController;
