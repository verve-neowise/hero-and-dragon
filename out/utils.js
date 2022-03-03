"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.ask = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const ask = (message) => prompt(message);
exports.ask = ask;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
exports.random = random;
