//1.创建一个promise对象
let pro = new Promise((resolve, reject) => {
    //为了防止出现异常
    try {
        console.log('开始处理逻辑的代码');
        //为了模拟错误，我们抛出一个错误
        throw new Error('我们自定义的模拟信息，然后后面的代码不会执行直接进入catch (error){}函数进行操作')
        setTimeout(() => {
            // 然后调用函数
            resolve(123); //处理事件，任务完成后，如果成功，直接调用resolve()方法
        }, 1000);
    } catch (error) {
        reject(error); //处理事件，任务完成后，如果失败，调用 reject()方法。 然后把当前的promise状态改为fail
    }
});
pro.then(data => {
    console.log('data:', data); //如果上面的函数处理成功的话，这个函数的data就是resolve(123);这个函数中的实参
}).catch(error => {
    console.log('error:', error); //如果上面的函数处理成功的话，这个函数的data就是reject(error);这个函数中的实参
});
console.log('结束');
// 第一次打印结果是：
// 开始处理逻辑的代码
// 结束
// data: 123

//第二次打印结果是：
// 开始处理逻辑的代码
// 结束
// error: Error: 我们自定义的模拟信息，然后后面的代码不会执行直接进入catch (error){}函数进行操作

//例子：then的链式编程
const fs = require('fs');
const path = require('path');
let p2 = new Promise((resolve, reject) => {
    console.log('promise 初始化');
    //读取02_const.js
    let fileData = fs.readFileSync(path.join(__dirname, '02_const.js'), 'utf8');
    resolve(fileData);
});
p2.then(data => {
    console.log('data:', data);
    return { data, time: Date.now() };
}).then(data => console.log(data)); //第二个then的data是第一个then返回的data。

//
let p1 = new Promise((resolve, reject) => {
    console.log('p1初始化');
    setTimeout(() => {
        resolve(123);
    }, 2000);
});
p1.then(data => {
    console.log('p1.then：data', data);
});
let p2 = new Promise((resolve, reject) => {
    console.log('p2初始化');
    resolve(p1); //如果resolve函数传入一个promise对象，那么必须等待传入的这个promise执行完成后，也就是then完之后才能才能改变当前promise的状态，进行then。
});
p2.then(data => {
    console.log('p2.then:data', data);
})

// p1初始化
// p2初始化
// p1.then:data 123
// p2.then:data 123

//then方法可以返回另外一个新的Promise，所以可以进行链式编程。
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100);
    }, 2000);
});
// p1.then(data => {}, error => {});这种写法和上面的那种相同的。
p1.then(data => {
        console.log('第一个promise对象的data:', data); //第一个promise对象的data: 100
        return 10; //return 10;会包装成为一个promise对象，这个promise对象的reject默认为10，然后传入后面的then函数中。
    }).then(data => {
        console.log('新的promise对象的data:', data); //新的promise对象的data: 10
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 2000);
        })
    }).then(data => {
        console.log('第三个promise对象的data:', data); //第三个promise对象的data: 3
    })
    .catch(error => console.log(error)) //catch方法这就是当出现错误的时候调用的方法，如果没有出现错误不会调用。
    .finally(() => {
        console.log('ssss');
    }); //finally()方法是无论如何都会调用的方法。//es2018的标准

//10.promise.all() 将所有的promise对象包装成一个新的promise实例
//所有的promise全部为resolve的时候则这个promise为resolve,其中一个为reject那么就是reject。
//then的参数是所有子promise的结果组成的数组。
Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(), Promise.reject(new Error('我们的错误'))])
    .then(data => console.log('data:', data)) //data: [ 1, 2, undefined ]
    .catch(error => console.log(error)); //Error: 我们的错误


//promise.race()的作用和promise.all()大致相同,但是race()方法是监听谁先结束，谁先执行结束就打印谁的data。

Promise.race([new Promise(resolve => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    }), Promise.resolve(2), Promise.reject(3)])
    .then(data => console.log('data:', data)) //data: 2
    .catch(error => console.log('error:', error));

Promise.race([new Promise(resolve => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    }), Promise.reject(3), Promise.resolve(2)])
    .then(data => console.log('data:', data))
    .catch(error => console.log('error:', error)); //error: 3


//12.Promise.resolve()方法可以生成一个resolve状态的promise对象。
//(1)接受一个promise实例参数
//(2)一个具有thenable的对象，拥有then方法的对象，然后就立即执行thenable对象的方法。
Promise.resolve({
    then(resolve, reject) {
        resolve(32);
    }
}).then(data => console.log(data)); //32

//(3)一个不具有thenable的对象，甚至都不是对象，那么直接返回一个promise对象，状态为resolve。
Promise.resolve('ssss'); //状态为resolve的对象，这个对象的data为'ssss';
//(4)不带任何参数，直接返回一个resolved状态的Promise对象。

//13.promise.reject()
//返回一个rejected状态的promise实例