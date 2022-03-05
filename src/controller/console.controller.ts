import { IO } from "../io/io"
import { Controller } from "./controller"

export class ConsoleController implements Controller {

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
