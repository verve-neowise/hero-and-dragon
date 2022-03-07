"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const action_1 = require("./actions/action");
const attack_action_1 = require("./actions/attack.action");
const defend_action_1 = require("./actions/defend.action");
const skip_action_1 = require("./actions/skip.action");
class Game {
    constructor(id, hero, dragon) {
        this.game = 0;
        this.running = true;
        this.id = id;
        this.hero = hero;
        this.dragon = dragon;
    }
    async start() {
        const actions = new Map([
            ['1', attack_action_1.attack],
            ['2', defend_action_1.defend],
            ['3', skip_action_1.skip],
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
            character.update();
            let command = await character.io.ask('Your side: ');
            let action = actions.get(command);
            if (action === undefined) {
                await character.io.send('Error: cannot find command ' + command);
                return false;
            }
            else {
                return action(character, enemy);
            }
        }
        else {
            await character.io.send('You lose :(');
            await enemy.io.send('You win! :)');
            await this.stopGame();
            return true;
        }
    }
    async stopGame() {
        this.running = false;
    }
    async sendForAll(message) {
        await (0, action_1.sendFor)(message, this.hero, this.dragon);
    }
    information() {
        return (`----------- ${this.game + 1} ------------
${this.hero.name}:    ${this.hero.hp}
${this.dragon.name}:  ${this.dragon.hp}`);
    }
}
exports.Game = Game;
