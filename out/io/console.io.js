"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleIO = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class ConsoleIO {
    async send(message) {
        console.log(message);
    }
    async ask(message) {
        return prompt(message);
    }
}
exports.ConsoleIO = ConsoleIO;
