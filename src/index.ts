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
    shield:  200,
    equiped: false
}

const heroActions = new Map<string, any>(
    [
        [ '?'     , help          ],
        [ 'hero'  , heroDetails   ],
        [ 'dragon', dragonDetails ],
        [ 'attack', attack        ],
        [ 'exit'  , exit          ],
        [ 'skip'  , () => {}      ],
        [ 'defend', defend        ]
    ]
)

const dragonActions = [
    dragonAttack,
    sleep
]

console.log('Hello hero! Today you can go fight the dragon.');
const ready: string = ask('Are you ready? (y/n):')

if (ready.toLocaleLowerCase() === 'n') {
    console.log('Okey, loser :)');
    exit()
}

console.log("You are next to the dragon.\n");

info()

while(true) {

    removeShield()

    // Player move
    let move = ask('>>>>> Your move? (? for help):')
    let action = heroActions.get(move)

    if (action === undefined) {
        console.log('Cannot find command. Please type \'?\' for see commands.');
        continue
    }
    else {
        action()
    }

    console.log('>>>>>> Dragon move');
    // Dragon move
    const dragonMove = random(0, 1)
    const dragonAction = dragonActions[dragonMove]

    dragonAction()
}

// Dragon actions

function sleep() {
    console.log('Dragon sleeping..');
}

function dragonAttack() {
    let damage = Dragon.power + Dragon.weapon - Hero.defence
    if (damage < 0) damage = 0
    Hero.hp -= damage

    console.log(`Taked damage! \n damage: ${damage}`);

    if (Hero.hp <= 0) {
        console.log('U+1F3AF You die!');
        exit()
    }
}

// Hero actions
function equipShield() {
    if (!Hero.equiped) {
        Hero.defence += Hero.shield
        Hero.equiped = true
    }
}

function removeShield() {
    if (Hero.equiped) {
        Hero.defence -= Hero.shield
        Hero.equiped = false
    }
}

function defend() {
    console.log("You are defend's");
    equipShield()
}

function attack() {

    if (random(0, 3) !== 2) {

        let damage = Hero.power + Hero.weapon - Dragon.defence
        
        if (damage < 0) damage = 0

        Dragon.hp -= damage

        console.log(`[✓] Success attack! \n damage: ${damage}    |   dragon hp: ${Dragon.hp}`);

        if (Dragon.hp <= 0) {
            console.log('U+1F3AF You win!');
            exit()
        }
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