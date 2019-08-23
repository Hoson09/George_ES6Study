//1.字符串作为数组进行解构赋值。（字符串可以当做对象来用，也可以当做数组来用）
let [a, b, c] = '123456';
console.log('a:', a);
console.log('b:', b);
console.log('c:', c);
//2.字符串当做对象来进行解构赋值(先转化成为一个包装对象然后再进行解构赋值)
let { toString: s, 0: a, 1: b, 2: c, 3: d } = 'aicoder';
console.log(s); //[Function: toString] s()会报错：TypeError: String.prototype.toString requires that 'this' be a String。因为这个只是一个简答的函数调用模式，this指向全局对象global。因为这个全局对象不是string格式，所以在方法内部调用上就有问题了。
//具体实例：
// var a = {
//     show: function() {
//         console.log(this);
//     }
// }
// let k = a.show;
// k(); //这是函数调用模式 this指向全局对象
// a.show(); //这是方法调用模式 this指向a。

console.log('a:', a); //a
console.log('b:', b); //i
console.log('c:', c); //c
console.log('d:', d); //o

//3.number和boolean类型的解构赋值
let { toString: s } = true;
let { toString: m } = 123;
console.log(s);
console.log(m);

//number和boolean都是先转化成一个包装对象然后解构赋值

//4.函数参数解构赋值
function add([a, b]) {
    console.log('a:', a);
    console.log('b:', b);
    return a + b;
}
console.log('add[1,2]:', add([1, 2]));
//5.函数参数解构赋值带默认值
function add([a = 10, b = 20]) {
    console.log('a:', a);
    console.log('b:', b);
    return a + b;
}
console.log('add[1]:', add([1]));

//6.函数参数对象解构赋值
function add({ a = 1, b = 1 }) {
    return a + b;
}
// console.log(add({ a: 2, b: 3 }));
// console.log(add({ a: 2 }));
console.log(add()); //TypeError: Cannot destructure property `a` of 'undefined' or 'null'. 因为你传入的是空，所以当一个给一个对象参数赋值为空显然是不合适的，也不能的。

//7.给函数参数对象解构赋一个默认值

function add({ a = 1, b = 1 } = {}) {
    return a + b;
}
console.log(add()); //因为这个传入实参是空，所以在函数的形参内部是{a=1,b=1}={}=空相当于{a=1,b=1}={}这样a和b就使用默认值就行。