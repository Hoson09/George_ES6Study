//1.async类似*,await类似与 yield
//异步函数返回的是promise实例，如果没有返回值或者非Promise都会被改造成一个resolve状态的Promise实例。
async function add() {
    return 1; //promise.resolve(1)
}
add().then(data => {
    console.log('data:', data); //data: 1
});
//2.await只能出现在async函数中
//后面跟一个promise实例。如果不是Promise实例，会被改造成resolve状态的Promise实例，而且会暂停函数的执行，直到Promise状态发生改变才会向下执行。
async function readFile() {
    console.log('readFile 函数开始执行');
    let data = await new Promise((resolve, reject) => {
        console.log('await 开始执行');
        setTimeout(() => {
            resolve(3333);
        }, 1000);
    }).catch(e => {});
    console.log('data:', data);
    await 1;
    await Promise.reject(22);
    await 2;
    await 1;
    return data;
}
readFile().then(data => { console.log('last data:', data) }).catch(e => {});
console.log('main');
//执行顺序
// readFile 函数开始执行
// await 开始执行
// main
// data: 3333
// last data: 3333

//3.异常处理

//4.async的状态改变
//只要一个await语句后面的promise变为reject，那么整个async函数都会中断执行
//async函数返回的promise对象，必须等到内部所有await命令后面的promise对象执行完，才会发生状态改变，除非遇到return或者抛出错误。

//5.async的多种形式
//函数的声明
async function add(params) {
    await 1;
}
//函数表达式
let f = async function() {};

//对象的方法
let f = {
        async getName() {

        }
    }
    //class的方法
class userName {
    async getName() {

    }
}

//箭头函数
let f = async() => {};

//6.依次读取两个文件内容，并把文件内容写入到第三方文件
const fs = require('fs');
const { join } = require('path');
const f1 = join(__dirname, '08_exp.js');
const f2 = join(__dirname, '09_fun.js');
const f3 = join(__dirname, 'b.js');

function readFilePromise(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', function(error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}
async function joinFile(f1, f2, f3) {
    let p1 = readFilePromise(f1)
    let p2 = readFilePromise(f2)
    let data1 = await p1;
    console.log('await...');
    let data2 = await p2;
    fs.writeFile(f3, data1 + data2, 'utf8', error => {
        console.log('写入完成');
    });
}
joinFile(f1, f2, f3).then(data => {
    console.log('最后的输出');
});
console.log('sss');
//打印出来的结果。因为当所有的promise对象完成后返回的对象状态才会发生改变，这样可以看出是异步进行的函数。
// sss
// await...
// 最后的输出
// 写入完成