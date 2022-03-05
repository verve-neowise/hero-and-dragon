abstract class A {
    a: number

    constructor(a: number) {
        this.a = a
    }

    say() {
        console.log("Say");
        this.action()
    }

    abstract action(): number
}

class B extends A {

    constructor() {
        super(12)
    }

    action(): number {
        console.log("B Action");
        return 5
    }
}

class C extends A {

    constructor() {
        super(12)
    }

    action(): number {
        console.log("C Action");
        return 7
    }
}

let obj: A = new C()

obj.say()