"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultIO = void 0;
class DefaultIO {
    constructor(_send, _ask) {
        this._send = _send;
        this._ask = _ask;
    }
    send(message) {
        return this._send(message);
    }
    ask(message) {
        return this._ask(message);
    }
}
exports.DefaultIO = DefaultIO;
