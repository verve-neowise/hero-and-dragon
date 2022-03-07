"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attack = void 0;
const utils_1 = require("../utils");
const action_1 = require("./action");
const attack = async (character, enemy) => {
    if (probability(75)) {
        let damage = enemy.takeDamage(character.damage());
        await (0, action_1.sendFor)(`${character.name} attacking ${enemy.name}. Damage ${damage}`, character, enemy);
    }
    else {
        await (0, action_1.sendFor)(`${character.name} missing attack`, character, enemy);
    }
    return true;
};
exports.attack = attack;
const probability = (persentage) => {
    return (0, utils_1.random)(0, persentage) < persentage;
};
