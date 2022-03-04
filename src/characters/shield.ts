export interface Shield {
    readonly defence: number
}

export class IronShield implements Shield {
    defence: number = 100;
}