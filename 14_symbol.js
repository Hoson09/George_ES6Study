//1. es6引入了一种新的原始数据类型Symbol，表示独一无二的值类似时间戳
//string number boolean object function null undefined array symbol
let s1 = Symbol(); //创建一个Symbol值
let s2 = Symbol();
console.log('s1===s2', s1 === s2); //s1===s2 false
//构建Symbol的值，直接执行Symbol的构造函数即可，不能用new，每次构造都会是独一无二的值
console.log('s1:', s1); //s1: Symbol()
s1.toString();
console.log(String(s1)); //Symbol()

//Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述。
let s3 = Symbol('huyi');
console.log('s3:', s3); //s3: Symbol(huyi)

//2.Symbol不能参与运算，但是可以Symbol值显示转为字符串
let s4 = Symbol('sss');
// console.log('s4:', s4 + '----'); //TypeError: Cannot convert a Symbol value to a string 不能隐式转换
console.log('s4.toString()+"----":', s4.toString() + '----'); //s4.toString()+"----": Symbol(sss)---- 可以显示转换。
//3.作为属性名的 Symbol 独一无二。
let t = {
    name: 'aicoder',
    age: '19',
    [Symbol('tt')]: 19,
    [Symbol('fun')]() {
        console.log('sss');
    }
};
console.log('Object.getOwnPropertyNames(t):', Object.getOwnPropertyNames(t)); //Object.getOwnPropertyNames(t): [ 'name', 'age' ]
console.log('Object.getOwnPropertySymbols(t):', Object.getOwnPropertySymbols(t)); //Object.getOwnPropertySymbols(t): [ Symbol(tt), Symbol(fun) ]
// 和for...of合作得出的结果
for (let s of Object.getOwnPropertySymbols(t)) {
    console.log('t[s]:', t[s]); //t[s]: 19 t[s]: [Symbol('fun')]() {console.log('sss');}
}

for (let key of Object.keys(t)) {
    console.log('key:', key); //key: name key: age
}

//4.属性名的遍历 Object.getOwnPropertySymbols()配合for...of循环。
//不能遍历Symbol属性：for...in for...of Object.keys() Object.getOwnPropertyNames()
//可以拿到Symbol命名的属性名的方法 Object.getOwnPropertySymbols()
console.log('Object.getOwnPropertySymbols(t):', Object.getOwnPropertySymbols(t));

//5. Symbol.for(),Symbol.keyFor()
//Symbol.for() 可以让Symbol对象产生一个唯一值
let s1 = Symbol.for('huyihong');
let s2 = Symbol.for('huyihong');
console.log('s1===s2:', s1 === s2); //s1===s2: true
console.log(Symbol.keyFor(s1)); //huyihong 可以根据对象实例拿到这个值。