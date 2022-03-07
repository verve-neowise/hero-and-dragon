"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFor = void 0;
const sendFor = async (message, ...characters) => {
    characters.forEach(async (character) => {
        character.io.send(message);
    });
};
exports.sendFor = sendFor;
