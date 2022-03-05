"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const utils_1 = require("../utils");
class Hero {
    constructor(controller, name, hp, defence, power) {
        this.weapon = undefined;
        this.shield = undefined;
        this.eqiuped = false;
        this.controller = controller;
        this.name = name;
        this.hp = hp;
        this.defence = defence;
        this.power = power;
    }
    attack(enemy) {
        if ((0, utils_1.random)(1, 4) !== 1) {
            let damage = this.damage();
            enemy.takeDamage(damage);
            return `${this.name} attacking ${enemy.name}. Damage ${damage}`;
        }
        else {
            return `${this.name} missing attack`;
        }
    }
    defend() {
        if (this.eqiupShield()) {
            return "Shield eqiuped.";
        }
        else {
            return 'Shield already eqiuped.';
        }
    }
    skip() {
        return "passing";
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
        this.hp -= damage;
        return this.alive();
    }
    details() {
        return `\nДетали ${this.name}: \n hp:      ${this.hp}\n defence: ${this.defence}\n power:   ${this.power}\n weapon:  ${this.weapon}\n shield:  ${this.shield}\n`;
    }
}
exports.Hero = Hero;
