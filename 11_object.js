//1.属性的简洁表示法
let name = 'aicoder.com';
let per = {
    age: 19,
    name: name
}
console.log(per); //{ age: 19, name: 'aicoder.com' }
//省略写法
let phone = '18227483210';
let name = 'aicoder.com';
let per = {
    age: 19,
    name,
    phone
}
console.log(per); //{ age: 19, name: 'aicoder.com', phone: '18227483210' }

//2.方法简写
let per = {
    age: 19,
    show: function() {
        console.log(this.age);
    }
}
per.show(); // 19
//简写：
let per = {
    age: 19,
    show() {
        console.log(this.age);
    }
}
per.show(); //19

//3.属性名表达式
let a = 'aicoder';
let b = 'sss';
let per = {
    [a + 1]: '123',
    [b]: 'bbb',
    show() {
        console.log(this[a + 1]); //123
        console.log('this[b]:', this[b]); //this[b]: bbb
        console.log('this.sss:', this.sss); //this.sss: bbb
    }
}
per.show(); //123
console.log('per:', per); //per: { aicoder1: '123', sss: 'bbb', show: [Function: show] }

//4.表达式还可以用于定义方法名
let a = 'add';
let per = {
    [a + 1]: function() {
        console.log('22222 aicoder.com');
    }
}
per[a + 1]();
console.log('person:', per); //person: { add1: [Function: add1] }

//5.对象方法的name属性返回函数名
console.log(per[a + 1].name); //add1

//6.有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字;Function构造函数创造的函数，name属性返回anonymous。
let f = function() {};
let k = f.bind({});
console.log('k.name:', k.name); //k.name: bound f

let f = new Function('console.log("你好")');
f();
console.log('f.name:', f.name); //f.name: anonymous

//7.Object.is() 它用来比较两个值是否严格相等，与严格比较运算符'==='的行为基本一致。
//’===‘严格相等运算符不能处理 NaN===NaN 而Object.is()可以
console.log(NaN === NaN); //false
console.log(Object.is(NaN, NaN)); //true
console.log(0 === -0); //true
console.log(Object.is(0, -0)); //false

//8.Object.assign 用于对象的合并,将源对象source的所有可枚举属性，复制到目标对象(target) 这个是浅拷贝。

let k = Object.assign({}, { a: 1 }, { b: 3 }, { c: 4 });
console.log('k:', k); //k: { a: 1, b: 3, c: 4 }

let m = { ai: 'aicoder' };
let s = Object.assign(m, { a: 1 }, { b: 3 }, { c: 4 });

console.log('s:', s); //s: { ai: 'aicoder', a: 1, b: 3, c: 4 }
console.log('m:', m); //m: { ai: 'aicoder', a: 1, b: 3, c: 4 }
s.a = 3;
console.log('s2:', s); //s2: { ai: 'aicoder', a: 3, b: 3, c: 4 }
console.log('m2:', m); //m2: { ai: 'aicoder', a: 3, b: 3, c: 4 } //确实是浅拷贝

//1. undefined和null无法转化成对象，所以他们作为第一个参数会报错，作为第二个参数或者后面的参数会被省略。
//2.Object.assign拷贝数字和布尔类型没有效果，字符串会转化字符数组

let n = Object.assign({}, 33, true, { a: 2 });
console.log('n:', n); //n: { a: 2 }
let n = Object.assign({}, 'aicoder');
console.log('n:', n);
// n: { '0': 'a','1': 'i','2': 'c','3': 'o','4': 'd','5': 'e','6': 'r' }

//数组的assign() 会生成一个伪数组
let n = Object.assign({}, ['a', 2, 3, 4, 'aaa']);
console.log('n:', n); //n: { '0': 'a', '1': 2, '2': 3, '3': 4, '4': 'aaa' }

//同名属性的替换
let m = {};
let k = Object.assign(m, { age: 22, name: 'sss' }, { age: 19 });
console.log('k:', k); //k: { age: 19, name: 'sss' }

//给对象赋默认值

//浅拷贝对象

//9.属性的定义与描述
let person = {};
person.age = 10;
Object.defineProperties(person, {
    name: {
        configurable: true, //可配置的
        enumerable: true, //可枚举的
        value: 'aicoder',
        writable: true //可改写的。
    },
    phone: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: '1232312'
    },
    address: {
        get: function() {
            return this._address;
        },
        set: function(val) {
            console.log(val); //1234
            this._address = val;
        }
    }
});
console.log('person:', person); //person: { age: 10, name: 'aicoder' }，因为person.phone是不可遍历的，所以没有打印出来
console.log(person.phone); //1232312 可以打印出来的，可读的，但是不可遍历的。
person.address = 1234;
console.log(person.address); //1234
for (let k in person) {
    console.log(k); //age name _address
}

/*****10.**/
let person = {};
person.age = 10;
console.log(Object.getOwnPropertyDescriptors(person));
// { age:
//   { value: 10,
//     writable: true,
//     enumerable: true,
//     configurable: true } }

Object.defineProperties(person, {
    name: {
        configurable: true, //可配置的
        enumerable: true, //可枚举的
        value: 'aicoder',
        writable: true //可改写的。
    },
    phone: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: '1232312'
    },
    address: {
        get: function() {
            return this._address;
        },
        set: function(val) {
            console.log(val); //1234
            this._address = val;
        }
    }
});
console.log('Object.getOwnPropertyDescriptors(person):', Object.getOwnPropertyDescriptors(person));
// Object.getOwnPropertyDescriptor(person): { age:
//   { value: 10,
//     writable: true,
//     enumerable: true,
//     configurable: true },
//  name:
//   { value: 'aicoder',
//     writable: true,
//     enumerable: true,
//     configurable: true },
//  phone:
//   { value: '1232312',
//     writable: false,
//     enumerable: false,
//     configurable: false },
//  address:
//   { get: [Function: get],
//     set: [Function: set],
//     enumerable: false,
//     configurable: false } }

//属性的可枚举性
let p = { age: 19, name: 'aicoder' };
Object.prototype.prop = 'faaaa'; //原型对象上的官方自带的属性默认都是不可枚举的，自己添加的一般默认是可枚举的。
for (let k in p) {
    console.log('k:', k); //k: age   k: name k: prop
}
//for in 循环不仅可以遍历自身的可枚举的属性，也可以遍历该对象继承的父级的可枚举属性

//Object.keys()和for...of 配合使用  Object.keys()返回对象自身所有可枚举属性的键名 这样就可以只获取自身的可枚举属性
let p = { age: 19, name: 'aicoder' };
Object.prototype.prop = 'faaaa'; //原型对象上的官方自带的属性默认都是不可枚举的，自己添加的一般默认是可枚举的。
for (let k of Object.keys(p)) {
    console.log('k:', k); //k: age    k: name

}

//JSON.stringify();只串行化对象自身的可枚举属性。


// Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身所有的属性的键名（包括不可枚举的属性，但是不含symbol属性）
let m = { age: 19 };
Object.defineProperties(m, {
    demo: {
        enumerable: false,
        value: '1232'
    }
});
console.log('m.demo:', m.demo); //m.demo: 1232
console.log('Object.keys(m):', Object.keys(m)); //Object.keys(m): [ 'age' ]
console.log('Object.getOwnPropertyNames(m):', Object.getOwnPropertyNames(m)); //Object.getOwnPropertyNames(m): [ 'age', 'demo' ]

//11.设置原型对象的方法 Object.setPrototypeOf();  es5: Object.create();
let p = {};
// p.__proto__ 这个只是在浏览器下部署的设置对象原型的方法。在node中并不支持。
// es5:
let p = Object.create({ age: 19 });
console.log(p.age); //19

Object.setPrototypeOf(p, { name: 'sss' }); //这个方法可以设置一个对象的原型
console.log('p.age:', p.age); //p.age: undefined
console.log('p.name:', p.name); //p.name: sss

//12.Object.getPrototypeOf() 获取一个对象的原型。 

//13. Object.keys() Object.values() (浏览器兼容，node可能不兼容)  Object.entries()

let k = { name: 'sss', age: 12 };
console.log('k.entries():', Object.entries(k)); //k.entries(): [ [ 'name', 'sss' ], [ 'age', 12 ] ]

//14. es2018 把...运算符引入了对象 
let { a, ...b } = { a: 123, b: 2344, c: 'addd' };
console.log('a:', a); //a: 123
console.log('b:', b); //b: { b: 2344, c: 'addd' }

//15.扩展运算符进行对象的浅拷贝复制
//对象的扩展运算符...用于取出对象中所有的可枚举属性，拷贝到当前对象中。
let k = { age: 19 };
let k2 = { name: 'sss' };
let k3 = {...k2, ...k };
console.log('k3:', k3); //k3: { name: 'sss', age: 19 }