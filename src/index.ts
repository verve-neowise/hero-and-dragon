import { exit } from "process";
import { ask, random } from "./utils";

const Dragon = {
    hp:      2000,
    defence: 120,
    power:   150,
    weapon:  0
}

const Hero = {
    hp:      1000,
    defence: 100,
    power:   120,
    weapon:  250,
    shield:  200
}

const actions = new Map<string, any>(
    [
        [ '?'     , help          ],
        [ 'hero'  , heroDetails   ],
        [ 'dragon', dragonDetails ],
        [ 'attack', attack        ],
        [ 'exit'  , exit         ],
    ]
)

console.log('Hello hero! Today you can go fight the dragon.');
const ready: string = ask('Are you ready? (y/n):')

if (ready.toLocaleLowerCase() === 'n') {
    console.log('Okey, loser :)');
    exit()
}

console.log("You are next to the dragon.\n");

info()

while(true) {

    // Player move
    let move = ask('Your move? (? for help):')
    let action = actions.get(move)

    if (action === undefined) {
        console.log('Cannot find command. Please type \'?\' for see commands.');
    }
    else {
        action()
    }
}

function attack() {
    if (random(0, 3) !== 2) {
        console.log("[✓] Success attack!");
        let damage = Hero.power + Hero.weapon - Dragon.defence
        Dragon.hp -= damage
    }
    else {
        console.log("[✕] Missed");
    }

    info()
}

function help() {
    console.log("Help");
    console.log("?      ->  help");
    console.log("hero   ->  hero details");
    console.log("dragon ->  dragon details");
    console.log("attack ->  attack dragon");
    console.log("exit   ->  run away from the fight");
}

function info() {
    console.log(`--------------------------------------------------`);
    console.log(`Hero: ${Hero.hp}       |      Dragon: ${Dragon.hp}`);
    console.log(`--------------------------------------------------`);
}

function heroDetails() {
    console.log(`\nHero details: \n hp:      ${Hero.hp}\n defence: ${Hero.defence}\n power:   ${Hero.power}\n weapon:  ${Hero.weapon}\n shield:  ${Hero.shield}\n`);    
}

function dragonDetails() {
    console.log(`\nDragon details: \n hp:      ${Dragon.hp}\n defence: ${Dragon.defence}\n power:   ${Dragon.power}\n weapon:  ${Dragon.weapon}\n`);    
}