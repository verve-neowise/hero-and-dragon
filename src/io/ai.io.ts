import { random } from "../utils"
import { IO } from "./io"

export class AiIO implements IO {

    async send(message: string): Promise<void> {
        // doing nothing
    }

    ask(message: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let timeout = random(500, 3000)
            setTimeout(() => {
                resolve(`${random(1, 3)}`)
            }, timeout)
        })
    }
}
