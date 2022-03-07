"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(io, name, hp, defence, power) {
        this.weapon = undefined;
        this.shield = undefined;
        this.eqiuped = false;
        this.io = io;
        this.name = name;
        this.hp = hp;
        this.defence = defence;
        this.power = power;
    }
    eqiupShield() {
        if (this.shield && !this.eqiuped) {
            this.defence += this.shield.defence;
            this.eqiuped = true;
            return true;
        }
        else {
            return false;
        }
    }
    removeShield() {
        if (this.shield && this.eqiuped) {
            this.defence -= this.shield.defence;
            this.eqiuped = false;
            return true;
        }
        else {
            return false;
        }
    }
    alive() {
        return this.hp > 0;
    }
    damage() {
        return this.power + (this.weapon ? this.weapon.damage : 0);
    }
    takeDamage(damage) {
        this.hp -= damage - this.defence;
        return (damage - this.defence);
    }
    update() {
        this.removeShield();
    }
    details() {
        return `\nДетали ${this.name}: \n hp:      ${this.hp}\n defence: ${this.defence}\n power:   ${this.power}\n weapon:  ${this.weapon}\n shield:  ${this.shield}\n`;
    }
}
exports.Character = Character;
