export type Callback = (answer: string) => void

export interface IO {
    send(message: string): Promise<void>
    ask(message: string): Promise<string>
}