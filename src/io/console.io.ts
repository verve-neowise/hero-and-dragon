import { IO } from "./io";

import PromptSync from "prompt-sync";
const prompt = PromptSync()

export class ConsoleIO implements IO {

    async send(message: string): Promise<void> {
        console.log(message);
    }

    async ask(message: string): Promise<string> {
        return prompt(message)
    }
}