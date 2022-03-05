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
exports.Game = void 0;
const hero_character_1 = require("./characters/hero.character");
const shield_1 = require("./characters/shield");
const weapon_1 = require("./characters/weapon");
const utils_1 = require("./utils");
class Game {
    constructor(id, heroController, dragonController) {
        this.game = 1;
        this.running = true;
        this.id = id;
        this.hero = new hero_character_1.Hero(heroController, 'Artur', 700, 100, 75);
        this.hero.weapon = new weapon_1.Sword();
        this.hero.shield = new shield_1.IronShield();
        this.dragon = new hero_character_1.Hero(dragonController, 'Dragone', 1500, 100, 120);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const actions = new Map([
                ['1', this.attack],
                ['2', this.defend],
                ['3', this.skip],
            ]);
            yield this.sendForAll('Starting game #' + this.id);
            while (this.running) {
                yield this.activate(this.hero, this.dragon, actions);
                yield this.activate(this.dragon, this.hero, actions);
            }
        });
    }
    activate(character, enemy, actions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendForAll(this.information());
            if (character.alive()) {
                let command = yield character.controller.next('Your side: ');
                let action = actions.get(command);
                if (action === undefined) {
                    yield character.controller.say('Error: cannot find command ' + command);
                }
                else {
                    yield action(character, enemy);
                }
            }
            else {
                yield character.controller.say('You lose :(');
                yield enemy.controller.say('You win! :)');
                yield this.stopGame();
            }
        });
    }
    stopGame() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    skip(character, enemy) {
        return __awaiter(this, void 0, void 0, function* () {
            yield character.controller.say("Skipped");
            yield enemy.controller.say(character.name + " skipped.");
        });
    }
    defend(character, enemy) {
        return __awaiter(this, void 0, void 0, function* () {
            if (character.eqiupShield()) {
                yield character.controller.say("Shield eqiuped.");
                yield enemy.controller.say(character.name + " defends.");
            }
            else {
                yield character.controller.say("Shield already eqiuped.");
            }
        });
    }
    attack(character, enemy) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.random)(1, 4) !== 1) {
                let damage = character.damage();
                enemy.takeDamage(damage);
                console.log(this);
                yield this.sendForAll(`${character.name} attacking ${enemy.name}. Damage ${damage}`);
            }
            else {
                yield this.sendForAll(`${character.name} missing attack`);
            }
        });
    }

    sendForAll(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.hero.controller.say(message);
            yield this.dragon.controller.say(message);
        });
    }
    information() {
        return (`----------- ${this.game} ------------
        Герой: "  + ${this.hero.hp}
        Дракон: " + ${this.dragon.hp}
        `);
    }
    help() {
        return (`Помощь
            -------- Игра -----------
            ?      ->  список комманд
            h      ->  данные героя
            d      ->  данные Дракона
            \n-------- Герой -----------
            1      ->  Атаковать
            2      ->  Защита
            3      ->  Пропустить ход
            q   ->  Убежать
        `);
    }
}
exports.Game = Game;
