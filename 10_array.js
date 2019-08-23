//1.数组的扩展运算符的运用
let k = [1, 2, 3, 4, 5, 'sss'];
console.log(...k);
//应用：Math.max方法获取数组的最大值
//替代apply的应用
//原先的方法
let m = [1, 2, 3, 4, 56, 43, 23, 1, 32, 54, 8, 99, 45, 33];
//可以使用Math.max()方法来获取最大值，但是这个方法不能直接一个数组对象，只能Math.max(1,5,23,4);来使用。
//如果要接受一个数组对象就必须要使用借用调用的方法 apply()
console.log('max:', Math.max.apply(null, m)); //=>99
console.log('max:', Math.max(m)); //=>NaN (这是错误的写法)

//es6的方法
let m = [1, 2, 3, 4, 56, 43, 23, 1, 32, 54, 8, 99, 45, 33];
let maxEs6 = Math.max(...m);
console.log('maxEs6:', maxEs6); //=>maxEs6: 99

//2. rest参数的逆应用
function sum(...arr) {
    return arr.reduce((prev, next) => prev + next);
}
console.log('sum(1,2,3,4,5,6,7,8,9,10):', sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); //sum(1,2,3,4,5,6,7,8,9,10): 55

//也可以展开一个数组进行传入

let m = [1, 3, 4, 5];
console.log('sum:', sum(...m)); //sum: 13

//3.复制数组
//es5中复制数组的方法
let m = [2, 3, 4];
let newarr = m.slice();
let newarr2 = m.concat();
//es6中复制的方法
let newarr3 = [...m];
let [...newarr4] = m;

//4.合并数组
let m = [2, 3, 4.5, 6];
let m1 = [2, 3, 4.5, 6];
let m2 = [2, 3, 4.5, 6];

let k = m.concat(m1, m2);
console.log(k); //[ 2, 3, 4.5, 6, 2, 3, 4.5, 6, 2, 3, 4.5, 6 ]

//es6中的方法
let n = [...m, ...m1, ...m2];

//5.字符串展开

let k = 'aicoder.com';
console.log('[...k]', [...k]); //[...k] [ 'a', 'i', 'c', 'o', 'd', 'e', 'r', '.', 'c', 'o', 'm' ]

//6.querySelectorAll 返回值的展开
let arr = [...document.querySelectorAll('li')];

//7.Array.from()转换成数组：1.类数组对象 伪数组 2.可遍历的对象
let obj = {
    '0': 1,
    '1': 2,
    'length': 2
};
let k = Array.from(obj);
console.log('k:', k); //k: [ 1, 2 ]

//8.数组的实例的 find(),findIndex()方法是用于找出第一个符合条件的数组成员或者索引
let k = [2, 3, 18, 22];
let m = k.find((val, index, arr) => {
    console.log('index:', index); //index: 0 index: 1 index: 2
    return val >= 10;
});
console.log('m:', m); //18
console.log('k.findIndex(val=>val>=10):', k.findIndex(val => val >= 10)); //k.findIndex(val=>val>=10): 2

//9.数组实例的fill方法使用给定值，填充一个数组
let k = new Array(10);
// k.fill(3);
// console.log('k:', k); //k: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]

let k = new Array(10);
k.fill('a', 3, 8); //fill()方法的第二个和第三个参数代表的是填充的起始位置和结束位置。
console.log('k:', k); //k: [ <3 empty items>, 'a', 'a', 'a', 'a', 'a', <2 empty items> ]

//10.数组实例的entries(),keys()和values()
let k = [2, 3, 18, 22];
for (let key of k.keys()) {
    console.log('key:', key); //key: 0 key: 1 key: 2 key: 3
}

for (let n of k.entries()) {
    console.log('n:', n);
}
// n: [ 0, 2 ]
// n: [ 1, 3 ]
// n: [ 2, 18 ]
// n: [ 3, 22 ]

for (let v of k.values()) {
    console.log('v:', v);
}
// v: 2
// v: 3
// v: 18
// v: 22

//11. includes()方法
let k = [2, 20, 23];
console.log(k.includes(2)); //true
console.log(k.includes(20)); //true
console.log(k.includes(234)); //false
console.log(k.includes(NaN)); //false