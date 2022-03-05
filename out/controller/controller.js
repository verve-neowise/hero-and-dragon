"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = exports.IOController = void 0;
const utils_1 = require("../utils");
class IOController {
    constructor(io) {
        this.io = io;
    }
    next(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.io.ask(message);
        });
    }
    say(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.io.send(message);
        });
    }
}
exports.IOController = IOController;
class AIController {
    next(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return `${(0, utils_1.random)(1, 3)}`;
        });
    }
    say(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message);
        });
    }
}
exports.AIController = AIController;
