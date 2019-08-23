//1.增加了函数参数的默认值
//以前的解决方式
function add(a, b) {
    a = a || 1;
    b = b || 1;
    return a + b;
}
//es6新增的方法
function add(a, b = 1) {
    return a + b;
}
console.log(add(1)); //2,b没有传值所以就是 b = 1 = 空 ====> b = 1;

//2.参数默认值是惰性求值  用到了才会赋值。

let x = 1;

function add(a, b = x) {
    return a + b;
}
console.log(add(1)); //2
x += 1;
console.log(add(1)); //3

//3.参数的默认值可以与解构赋值结合起来使用
function add({ a, b = 1 } = {}) {
    return a + b;
}
console.log(add({ a: 3 })); //4

//4.尾参数定义的默认值是可以省略的，否则是不能省略调用传参。
function add(a, b = 9, c) {
    return a + b + c;
}
console.log(add(1, undefined, 2)); //12 要使用中间的这个默认值，但是不能省略实参。
function add(a, b, c = 9) {
    return a + b + c;
}
console.log(add(1, 2)); //12 现在为尾参数要是用默认值，就可以省略实参。

//5.函数的length 属性 在定义了默认值后会失真
function add(a, b = 9) {
    return a + b;
}
console.log(add.length); //1

//6. 设置了参数的默认值，函数进行声明初始化时候，参数会形成一个单独作用域（context）。等到初始化结束，这个作用域就会消失。
let x = 1;

function add(a, b = x) { //赋值的时候会形成单独的作用域，初始化完成后会释放。
    let x = 2;
    console.log(b); //1
}
add();

//7.es6 新增rest参数（形式为...变量名），用于获取函数的多余参数
function add(...num) {
    return num.reduce((prev, cur, index) => { //这个回调函数的返回值，作为下一次调用回调函数的prev参数再次进行调用函数。
        console.log('prev:', prev);
        console.log('cur:', cur);
        console.log('index:', index);
        return prev + cur;
    });
}
console.log('add(3,4,5):', add(3, 4, 5)); //=>12

//8.函数严格模式的改变
//从es5开始，函数内部可以设定为严格模式，es2016做了一点修改，规定只要函数参数使用了默认值，解构赋值或者扩展运算符，那么函数内部就不能显示设定为严格模式。否则会报错


//9.函数的name属性，返回该函数的函数名
function add(a, b) {
    return a + b;
}
console.log('add().name:', add.name);
const t = function(a, b) { return a + b; }
console.log('t.name:', t.name);

//10.箭头函数的复习

const fun = function(a, b) { return a + b; }

const fun = (a, b) => a + b;

const fun = () => {
    console.log(3);
    return 9;
};
//如果要返回一个对象的话，要在需要返回的对象的花括号外面打上一个圆括号。
const f = () => ({ a: 3, b: 5 });

//如果不需要返回值的时候 可以使用void来表示
const f = a => void console.log(a);

let arr = [3, 9, 2, 1, 22];
arr.sort((a, b) => a - b);
console.log('arr:', arr);

//箭头函数的注意点：
//1.函数体内的this对象，就是定义时绑定所在的对象，而不是调用使用时绑定所在的对象。所谓所谓的定义时候绑定，就是this是继承自父执行上下文中的this！！！也就是说箭头函数的this就是他定义的时候的父级所在执行上下文中的this。
//2.不可以当做构造函数，只可以作为匿名函数，或者函数声明
//3.函数体内没有arguments伪数组对象，如要使用只能使用rest参数来代替
//4.不可以使用yield命令，因此箭头函数不能用作Generator函数

//11.尾调用 尾函数
function b() {};

function add() {
    return b(); //尾函数,这样在b()函数进行调用的时候会进行add()函数弹栈，然后进入b()函数中进行操作，避免函数的嵌套。
}

function add() {
    return b() * 3; //非尾函数尾调用(只要进行运算操作了就不是尾函数和尾调用)
}

//12.尾递归

//递归的方法： 传统的递归方法会让函数进行嵌套，造成计算机的运行内存过大，如果要进行大量的计算的话，极其消耗性能。
function sum(num) {
    if (num > 1) {
        return sum(num - 1) + num;
    } else {
        return 1;
    }
}
console.log(sum(10)); //55

//for循环的方法能稍微好一点
let sum = 0,
    num = 10000;
for (let i = 1; i <= num; i++) {
    sum += i;
}
console.log('sum:', sum); //sum: 50005000

//13.递归的优化->尾递归的优化->循环
//尾递归的应用
function sum(num, total = 0) {
    if (num > 0) {
        return sum(num - 1, total + num); //这属于尾函数尾调用
    } else {
        return total;
    }
}

console.log('sum:', sum(1000)); //sum: 500500