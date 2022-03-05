"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const utils_1 = require("../utils");
class AIController {
    async next(message) {
        return new Promise((resolve, reject) => {
            let timeout = (0, utils_1.random)(500, 3000);
            console.log('{ ai respond after ' + timeout + 'ms }');
            setTimeout(() => {
                resolve(`${(0, utils_1.random)(1, 3)}`);
            }, timeout);
        });
    }
    async say(message) {
        // console.log(message);
    }
}
exports.AIController = AIController;
