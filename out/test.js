"use strict";
class A {
    constructor(a) {
        this.a = a;
    }
    say() {
        console.log("Say");
        this.action();
    }
}
class B extends A {
    constructor() {
        super(12);
    }
    action() {
        console.log("B Action");
        return 5;
    }
}
class C extends A {
    constructor() {
        super(12);
    }
    action() {
        console.log("C Action");
        return 7;
    }
}
let obj = new C();
obj.say();
