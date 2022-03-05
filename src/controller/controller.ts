import { IO } from "../io/io"
import { random } from "../utils"

export interface Controller {
    next(message: string): Promise<string> 
    say(message: string): Promise<void>
}

export class IOController implements Controller {

    private readonly io: IO

    constructor(io: IO) {
        this.io = io
    }

    async next(message: string): Promise<string> {
        return this.io.ask(message)
    }

    async say(message: string): Promise<void> {
        return this.io.send(message)
    }
}

export class AIController implements Controller {
    
    async next(message: string): Promise<string> {
        return `${random(1, 3)}`
    }

    async say(message: string): Promise<void> {
        console.log(message);
    }
}