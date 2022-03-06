"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiIO = void 0;
const utils_1 = require("../utils");
class AiIO {
    async send(message) {
        // doing nothing
    }
    ask(message) {
        return new Promise((resolve, reject) => {
            let timeout = (0, utils_1.random)(500, 3000);
            setTimeout(() => {
                resolve(`${(0, utils_1.random)(1, 3)}`);
            }, timeout);
        });
    }
}
exports.AiIO = AiIO;
