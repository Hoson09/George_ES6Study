//1.generator函数
function* helloWorldGenerator() {
    console.log('hello 开始');
    yield 'hello';
    console.log('world 开始');
    yield 'world';
    return 'generator';
}
let k = helloWorldGenerator(); //这个可以返回一个遍历器对象而且遍历器对象具有next对象函数方法。
console.log('next方法调用之前');
console.log('k.next():', k.next());
console.log('k.next():', k.next());
console.log('k.next():', k.next());

// next方法调用之前
// hello 开始
// k.next(): { value: 'hello', done: false }
// world 开始
// k.next(): { value: 'world', done: false }
// k.next(): { value: 'generator', done: true }

//2.Generator函数调用后并不会立即执行函数内部的代码，而是会先返回一个遍历器对象，执行遍历器对象的next方法才会执行函数内部的代码，以关键字yield为界限。

//3.yield关键字

//4.与iterator接口的关系。
function* G1() {
    yield 1;
    yield 2;
    yield 3;
}
let t = {
    [Symbol.iterator]() {
        return G1();
    }
}
for (let k of t) {
    console.log('k:', k); //k: 1 k: 2 k: 3
}

//5.for...of 循环
function* G1() {
    yield 1;
    yield 2;
    yield 3;
}
for (let k of G1()) {
    console.log('k:', k); //k: 1 k: 2 k: 3
}

function* G1() {
    yield 1;
    yield 2;
    yield 3;
    return 4; //next {value:4,done:true}
}
for (let k of G1()) { //当关键字yield循环完了然后遇到return关键字，然后next()方法遇到return 4会返回一个{ value: 4, done: true }，当done为true的时候for...of循环会立即结束，所以打印出来结果和上面没有不一样的，没有输出k:4
    console.log('k:', k); //k: 1 k: 2 k: 3
}

//6.next()方法可以具有参数
function* add() {
    let a1 = yield 1; //==>{value:1,done:false}
    let a2 = yield 2;
    let a3 = yield 3;
    console.log('a1:', a1);
    console.log('a2:', a2);
    console.log('a3:', a3);
}
let g = add(); //返回一个遍历器对象
console.log(g.next()); //{value:1,done:false}
console.log('g.next(3333):', g.next(3333)); //g.next(3333): { value: 2, done: false }
console.log('g.next(4444):', g.next(4444)); //g.next(4444): { value: 3, done: false }
console.log('g.next(5555):', g.next(5555)); //g.next(5555): { value: undefined, done: true }

// { value: 1, done: false }
// g.next(3333): { value: 2, done: false }
// g.next(4444): { value: 3, done: false }
// a1: 3333
// a2: 4444
// a3: 5555
// g.next(5555): { value: undefined, done: true }

//7.Generator.prototype.throw()
//Generator 函数返回的遍历器对象，都有一个throw对象，可以在函数体外抛出错误，然后在Generator 函数体内捕获。
function* G1() {
    try {
        yield 1;
        yield 2;
        yield 3;
        return 4; //next {value:4,done:true}
    } catch (e) {
        console.log('e:', e); //e: Error: 我们的异常信息
    }
}
let g = G1();
console.log(g.next()); //{ value: 1, done: false }
console.log(g.next()); //{ value: 2, done: false }
g.throw(new Error('我们的异常信息')); //e: Error: 我们的异常信息
console.log(g.next());
console.log(g.next());

//8.generator.prototype.return()
function* G2() {
    yield 'adcd';
    yield 3;
    yield 4;
}
let k = G2();
console.log(k.next()); //{ value: 'adcd', done: false }
console.log('k.return("999"):', k.return('999')); //k.return("999"): { value: '999', done: true }

//9.yield* 表达式
function* G2() {
    yield 'adcd';
    yield 3;
    yield 4;
}

function* G3() {
    yield 1;
    yield 2;
    yield* G2(); //===for(let k of G2()){console.log('k:',k)};//加*表示是一个遍历器对象
    yield 5;
}
for (let k of G3()) {
    console.log('k:', k); //k: 1 k: 2 k: adcd k: 3 k: 4 k: 5
}

function* G2() {
    yield 'adcd';
    yield 3;
    yield 4;
}

function* G3() {
    yield 1;
    yield 2;
    yield G2(); //yield如果不加*的时候表示引入了一个Generator类型的函数
    yield 5;
}
for (let k of G3()) {
    console.log('k:', k); //k: 1 k: 2 k: Object [Generator] {} k: 5
}
//yield* 跟可遍历的对象
function* G4() {
    yield 1;
    yield [2, 3, 4, 5];
    yield 9;
}
for (let k of G4()) {
    console.log('k:', k); //k: 1  k: [ 2, 3, 4, 5 ] k: 9

}

function* G4() {
    yield 1;
    yield*[2, 3, 4, 5];
    yield 9;
}
for (let k of G4()) {
    console.log('k:', k);

}
// k: 1
// k: 2
// k: 3
// k: 4
// k: 5
// k: 9

//10.作为对象属性的Generator函数

let k = {
    * G5() {
        yield*[1, 2, 3, 4, 5]
    }
}
for (let t of k.G5()) {
    console.log('k:', t);
}
// k: 1
// k: 2
// k: 3
// k: 4
// k: 5