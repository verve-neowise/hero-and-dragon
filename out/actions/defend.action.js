"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defend = void 0;
const defend = async (character, enemy) => {
    if (character.eqiupShield()) {
        await character.io.send("Shield eqiuped.");
    }
    else {
        await character.io.send("Shield already eqiuped.");
    }
    await enemy.io.send(character.name + " defends.");
    return true;
};
exports.defend = defend;
