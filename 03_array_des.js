//1.数组对应的解构赋值
//第一种赋值方式：
let a = 1,
    b = 2,
    c = 3;

//第二种赋值方式：
let a = 1;
let b = 2;
let c = 3;

//第三种赋值方式：解构赋值
let [a, b, c] = [1, 2, 3];
console.log('a,b,c:', a, b, c);

//2.复杂的解构赋值
let [a, [b], c] = [4, [5], 6];
console.log('a,b,c:', a, b, c);

//3.越过解析
let [a, , b] = [1, 2, 3];
console.log('a:', a); //=>1
console.log('b:', b); //=>3

//4.配合展开运算符  ...d是配合展开运算符，后面可以跟很多东西。
let [a, [b, ...d], c] = [4, [5, 9, 10], 6];
console.log('a:', a);
console.log('b:', b);
console.log('c:', c);
console.log('d:', d); //d: [ 9, 10 ]
//5,如果解构不成功，变量的值就等于undefined。
let [a, b] = [1];
console.log('a:', a);
console.log('b:', b); //b: undefined

//6.不完全解构
let [a, [b], c] = [4, [5, 9, 10], 6];
console.log('a,b,c:', a, b, c); //a,b,c: 4 5 6

//7.数组的解构赋值：如果等号的右边不是数组或者可以遍历的数据类型，那么将会报错。(除了字符串和可以遍历的对象类型)。

// let [a, b] = null;
// let [a, b] = undefined;//TypeError:undefined is not iterable
// let [a, b] = {};//TypeError:{} is not iterable
// let [a, b] = 123;以上这些都会报错。因为这些都没有可遍历性。TypeError:123 is not iterable
let [a, b] = 'sas'; //这个是可以的，因为js的字符串具有可以遍历。
console.log('a:', a);
console.log('b:', b);

//8.解构赋值允许指定默认值(这个默认值就是初始值，如果后续有赋值操作那么会改变值，如果后续没有赋值操作或者赋值undefined的话，那么就会取初始值)。
let [a = 9, b = 5, c = 8] = [1, 2];
console.log('a:', a);
console.log('b:', b);
console.log('c:', c); //c: 8

//9.当一个数组成员严格等于undefined，默认值才会生效

//10.默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [a = 9, b = a] = [1, 3];
console.log('a:', a); //=>1
console.log('b:', b); //=>3
let [a = 9, b = a] = [1, undefined];
console.log('a:', a); //=>1
console.log('b:', b); //=>1

let a = { m: 1, n: 2, s: 4 };
console.log({
    ...a
}); //{ m: 1, n: 2, s: 4 } //对象可以被展开 但是必须在一个可以承载对象的环境内展开，才行。否则不可以展开。