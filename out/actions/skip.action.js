"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skip = void 0;
const skip = async (character, enemy) => {
    await character.io.send("Skipped");
    await enemy.io.send(character.name + " skipped.");
    return true;
};
exports.skip = skip;
