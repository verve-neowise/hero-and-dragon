import PromptSync from "prompt-sync"
const prompt = PromptSync()

export const ask = (message: string) => prompt(message)
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min