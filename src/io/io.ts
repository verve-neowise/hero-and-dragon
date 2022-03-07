export type Callback = (answer: string) => void

export interface IO {
    send(message: string): Promise<void>
    ask(message: string): Promise<string>
}

export class DefaultIO implements IO {

    constructor(
        private _send: (message: string) => Promise<void>, 
        private _ask:  (message: string) => Promise<string>
        ) {}

    send(message: string): Promise<void> {
        return this._send(message)
    }

    ask(message: string): Promise<string> {
        return this._ask(message)
    }
}