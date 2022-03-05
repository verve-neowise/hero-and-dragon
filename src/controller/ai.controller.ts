import { random } from "../utils";
import { Controller } from "./controller";

export class AIController implements Controller {

    async next(message: string): Promise<string> {
        return new Promise((resolve, reject) => {

            let timeout = random(500, 3000)

            console.log('{ ai respond after ' + timeout + 'ms }');

            setTimeout(() => {
                resolve(`${random(1, 3)}`)
            }, timeout)
        })
    }

    async say(message: string): Promise<void> {
        // console.log(message);
    }
}