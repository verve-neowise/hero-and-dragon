"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const shield_1 = require("./characters/shield");
const weapon_1 = require("./characters/weapon");
const character_1 = require("./characters/character");
const utils_1 = require("./utils");
class Action {
    constructor(_execution) {
        this._execution = _execution;
    }
    async execute(first, second) {
        await this._execution(first, second);
    }
}
class Game {
    constructor(id, heroController, dragonController) {
        this.game = 0;
        this.running = true;
        this.id = id;
        this.hero = new character_1.Character(heroController, 'Artur', 700, 100, 75);
        this.hero.weapon = new weapon_1.Sword();
        this.hero.shield = new shield_1.IronShield();
        this.dragon = new character_1.Character(dragonController, 'Dragone', 1500, 100, 250);
    }
    async start() {
        const actions = new Map([
            ['1', new Action((first, second) => this.attack(first, second))],
            ['2', new Action((first, second) => this.defend(first, second))],
            ['3', new Action((first, second) => this.skip(first, second))],
        ]);
        await this.sendForAll('Starting game #' + this.id);
        let parts = [
            [this.hero, this.dragon],
            [this.dragon, this.hero],
        ];
        while (this.running) {
            await this.sendForAll(this.information());
            for (let i = 0; i < parts.length && this.running;) {
                if (await this.activate(parts[i], actions)) {
                    i++;
                }
            }
        }
    }
    async activate([character, enemy], actions) {
        if (character.alive()) {
            character.removeShield();
            let command = await character.controller.next('Your side: ');
            let action = actions.get(command);
            if (action === undefined) {
                await character.controller.say('Error: cannot find command ' + command);
                return false;
            }
            else {
                await action.execute(character, enemy);
                return true;
            }
        }
        else {
            await character.controller.say('You lose :(');
            await enemy.controller.say('You win! :)');
            await this.stopGame();
            return true;
        }
    }
    async stopGame() {
        this.running = false;
    }
    async skip(character, enemy) {
        await character.controller.say("Skipped");
        await enemy.controller.say(character.name + " skipped.");
    }
    async defend(character, enemy) {
        if (character.eqiupShield()) {
            await character.controller.say("Shield eqiuped.");
        }
        else {
            await character.controller.say("Shield already eqiuped.");
        }
        await enemy.controller.say(character.name + " defends.");
    }
    async attack(character, enemy) {
        if ((0, utils_1.random)(1, 4) !== 1) {
            let damage = enemy.takeDamage(character.damage());
            await this.sendForAll(`${character.name} attacking ${enemy.name}. Damage ${damage}`);
        }
        else {
            await this.sendForAll(`${character.name} missing attack`);
        }
    }
    async sendForAll(message) {
        await this.hero.controller.say(message);
        await this.dragon.controller.say(message);
    }
    information() {
        return (`----------- ${this.game + 1} ------------
${this.hero.name}:    ${this.hero.hp}
${this.dragon.name}:  ${this.dragon.hp}`);
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
