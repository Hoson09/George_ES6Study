//对象的解构赋值
//1.变量必须与属性名同名，才能取到正确的值。
let { a, b } = { a: 123, b: 234 };
console.log('a:', a);
console.log('b:', b);
//2.对象的解构赋值和顺序没有关系
let { a, b } = { b: 234, a: 123 };
console.log('a:', a);
console.log('b:', b);

//3.对象解构赋值的默认值也是undefined。
let { a, b, c } = { a: 123, b: 234 };
console.log('a:', a);
console.log('b:', b);
console.log('c:', c); //=>undefined

//4.变量名与属性名不一致
let { a: ax, b: bx } = { a: 123, b: 234 };
// console.log('a:', a);//ReferenceError: a is not defined
// console.log('b:', b);//ReferenceError: b is not defined
console.log('ax:', ax); //=>123 可以看出这里面的a已经更换名字为ax，而这里的a的作用只是为了与后面的a对应结构而已。
console.log('bx:', bx); //=>234

//5.嵌套结构的对象解构
let { a: { x: ax, y: ay }, user: { name, td: std } } = { a: { x: 10, y: 20 }, user: { name: 'laoma', age: 18, td: [1, 2, 3] } };
console.log('ax:', ax); //=>10
console.log('ay:', ay); //=>20
console.log('std:', std); //=>[1,2,3]
console.log('name:', name); //=>laoma

//6.指定默认值
let { x = 0, y = 0 } = { x: 10 };
console.log('x:', x); //=>10
console.log('y:', y); //=>0
let { x = 0, y = 0 } = { x: 10, y: null };
console.log('x:', x); //=>10
console.log('y:', y); //=>null 当在后面赋值为undefined的时候才会使用默认值，否则都会赋值给定的值，就算是null也会被赋值

//7.解构现存对象的方法
let { max, min } = Math;
console.log('max(1,2,3,4):', max(1, 2, 3, 4)); //=>4
console.log('max(1,2,3,4):', min(1, 2, 3, 4)); //=>1

//8.对数组进行对象属性的解构，数组也是特殊的对象。

let arr = [1, 2, 3];
let { 0: a, 1: b, 2: c, 3: d } = arr;
console.log('a:', a); //=>1
console.log('b:', b); //=>2
console.log('c:', c); //=>3
console.log('d:', d); //=>undefined

//过点：
let { a } = { a: [1, 2, 3] };
console.log(a); //[ 1, 2, 3 ]