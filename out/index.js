"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const utils_1 = require("./utils");
const Dragon = {
    hp: 2000,
    defence: 120,
    power: 150,
    weapon: 0
};
const Hero = {
    hp: 700,
    defence: 100,
    power: 120,
    weapon: 100,
    shield: 100,
    equiped: false
};
let game = 1;
const heroActions = new Map([
    ['1', attack],
    ['2', defend],
    ['3', () => { }]
]);
const gameCommands = new Map([
    ['?', help],
    ['h', heroDetails],
    ['d', dragonDetails],
    ['q', process_1.exit]
]);
const dragonActions = [
    dragonAttack,
    sleep
];
console.log('Привет Герой, сегодня ты идешь сражаться с Драконом');
const ready = (0, utils_1.ask)('Ты готов? (y/n) (д/н):');
if (ready.toLocaleLowerCase() === 'n' || ready.toLocaleLowerCase() === 'н') {
    console.log('Окей трусишка :)');
    (0, process_1.exit)();
}
console.log("Ты добрался до Дракона.\n");
help();
while (true) {
    info();
    removeShield();
    // Player move
    let move = (0, utils_1.ask)('>>>>> Твой ход: ');
    let action = heroActions.get(move);
    if (action === undefined) {
        let command = gameCommands.get(move);
        if (command === undefined) {
            console.log('Команда не найдена. Пожалуйста напиши \'?\' для просмотра комманд.');
            continue;
        }
        else {
            command();
            continue;
        }
    }
    else {
        action();
    }
    console.log('>>>>>> Дракон: ');
    // Dragon move
    const dragonMove = (0, utils_1.random)(0, 1);
    const dragonAction = dragonActions[dragonMove];
    dragonAction();
}
// Dragon actions
function sleep() {
    console.log('Уснул..');
}
function dragonAttack() {
    console.log(`Атакует!`);
    let damage = Dragon.power + Dragon.weapon - Hero.defence;
    if (damage < 0)
        damage = 0;
    Hero.hp -= damage;
    console.log(`Ты получил ${damage} урона!`);
    if (Hero.hp <= 0) {
        console.log('Ты мертв! :(');
        (0, process_1.exit)();
    }
}
// Hero actions
function equipShield() {
    if (!Hero.equiped) {
        Hero.defence += Hero.shield;
        Hero.equiped = true;
    }
}
function removeShield() {
    if (Hero.equiped) {
        Hero.defence -= Hero.shield;
        Hero.equiped = false;
    }
}
function defend() {
    console.log("[Защита]");
    equipShield();
}
function attack() {
    if ((0, utils_1.random)(0, 3) !== 2) {
        let damage = Hero.power + Hero.weapon - Dragon.defence;
        if (damage < 0)
            damage = 0;
        Dragon.hp -= damage;
        console.log(`[✓] Упешная атака. ${damage} урона!`);
        if (Dragon.hp <= 0) {
            console.log('Ты победил дракона! :)');
            (0, process_1.exit)();
        }
    }
    else {
        console.log("[✕] Промахнулся");
    }
}
function help() {
    console.log("Помощь");
    console.log("-------- Игра -----------");
    console.log("?      ->  список комманд");
    console.log("h      ->  данные героя");
    console.log("d      ->  данные Дракона");
    console.log("\n-------- Герой -----------");
    console.log("1      ->  Атаковать");
    console.log("2      ->  Защита");
    console.log("3      ->  Пропустить ход");
    console.log("q   ->  Убежать");
}
function info() {
    console.log(`----------- ${game++} ------------`);
    console.log("Герой: " + Hero.hp);
    console.log("Дракон: " + Dragon.hp);
}
function heroDetails() {
    console.log(`\nДетали Героя: \n hp:      ${Hero.hp}\n defence: ${Hero.defence}\n power:   ${Hero.power}\n weapon:  ${Hero.weapon}\n shield:  ${Hero.shield}\n`);
}
function dragonDetails() {
    console.log(`\Детали Дракона: \n hp:      ${Dragon.hp}\n defence: ${Dragon.defence}\n power:   ${Dragon.power}\n weapon:  ${Dragon.weapon}\n`);
}
