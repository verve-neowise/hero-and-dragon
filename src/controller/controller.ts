export interface Controller {
    next(message: string): Promise<string> 
    say(message: string): Promise<void>
}