//1. Class的基本语法
// es5:
function Person(name = 'aicoder', age = 19) {
    this.age = age;
    this.name = name;
    console.log('this:', this); //this: Person { age: 19, name: 'huyi' }
}
Person.prototype.show = function() {
    console.log(this.name, this.age);
}

let p = new Person('huyi');
p.show(); //huyi 19

//es6 使用class关键字定义类型
class Person {
    show() {
            console.log(this.Pname);
        } //在class中定义的方法就是在原型上定义的方法。
    get Pname() {
        return this._PName;
    }
    set Pname(val) {
        this._PName = val;
    }
}
let p = new Person();
p.Pname = 'sss';
p.show(); //sss
console.log('typeof Person:', typeof Person); //typeof Person: function //Person类型的本质跟原来的构造函数是一样的。
console.log('Person.prototype.show:', Person.prototype.show);
// Person.prototype.show: show() {
//   console.log(this.Pname);
// }

//2. 类的方法都定义在 类的原型上

//3. 构造函数的constructor 方法 es6规定每个类都需要定义一个构造函数，如果没有定义，默认给一个空的构造函数。
class Person {
    constructor(name = 'aicoder.com', age = 19) { //相当于以前在构造函数中生成的方法
        this.age = age;
        this.name = name;
    }
    show() {
        console.log('this.age:', this.age); //this.age: 19
        console.log('this.age:', this.name); //this.age: aicoder.com
    }
}
let p = new Person(); //es6中用class定义的类型，必须用new来构建。
p.show();
let p2 = new Person('laoma', 18);
p2.show();

//构造函数中,返回其他对象（不推荐）
class Person {
    constructor(name, age) {
        return {
            name,
            age
        }
    }
}
let p = new Person('ss', 123);
console.log('p:', p); //p: { name: 'ss', age: 123 }

//class类型的创建实例必须使用new，不然会报错。

//4.严格模式
//类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式，只要你的代码写在类和模块之中，就只有严格模式可用。

//5.Class 表达式(函数表达式)

let Person = class {
    show() {
        console.log('123');
    }
};
let p = new Person();
p.show(); //123

//6.类的声明不存在变量提升(hoist) (这是与构造函数声明的区别)
let p = new Person();
p.show(); //ReferenceError: Person is not defined
class Person {
    show() {
        console.log('ssss');
    }
}

//7. this的指向。类的方法内部如果含有this，他默认指向类的实例
//但是如果使用解构赋值，this可能就不指向当前对象了
class Person {
    constructor() {
        this.show = this.show.bind(this); //有延迟执行。
    }
    show() {
        console.log('this:', this);
    }
}
let p = new Person();
p.show(); //this: Person {} （因为没有给定constructor函数 所以默认是空）

//使用解构赋值
let { show } = p;
show(); //this: undefined （这个属于函数的调用，在浏览器端的非严格模式下函数调用的this指向window，在严格模式下函数调用模式的this指向undefined。） 
//为了不让this指向undefined或者window ，我们可以使用1.bind() 2.箭头函数 来解决这个问题
//给相关的构造函数添加bind()方法之后
// 打印出来的结果是
// this: Person { show: [Function: bound show] }
// this: Person { show: [Function: bound show] }

//8.class的静态方法：
//类的方法加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为静态方法。
class Person {
    static Add(a, b) {
        return a + b;
    }
}

console.log(Person.Add(10, 20)); //30
//设定静态属性
Person.PI = '123.234243';

//9.Class的继承 extends
//继承至少需要实现的目标：
//（1）.把父类的构造函数里面初始化对象的代码要执行。并且保证父类的初始化代码只执行一次
//（2）.把父类的构造函数的原型上定义的方法反复进行拷贝。

//extends关键字，继承了父类的所有的属性和方法
//子类必须在constructor方法中调用super方法。super来调用父类的构造函数，在子类的构造函数中，只有调用super方法之后，才可以使用this关键字，否则会报错。
//先调用父类的构造函数然后在父类的构造函数上进行扩展子类的内容

class Person {
    constructor(name = '', age = 18) {
        this.name = name;
        this.age = age;
    }
    show() {
        console.log('this.name:', this.name);
        console.log('this.age:', this.age);
    }
}
class Student extends Person {
    constructor(name = '', age = 18, phone = '') {
        super(name, age); //继承：必须要调用super()方法 如果要使用this 必须在使用this之前先调用super()方法，这个方法指向父类构造函数
        this.phone = phone;
    }
}

let s = new Student('huyi', 20, '182333434');
s.show(); //this.name: huyi this.age: 20

//10.继承原生的构造函数
function Person(age, name) {
    this.age = age;
    this.name = name;
};
Person.prototype.show = function() {
    console.log('this.age:', this.age);
    console.log('this.name:', this.name);
};
class Student extends Person {
    constructor(age, name) {
        super(age, name);
    }
}

let s = new Student(19, 'ssss');
s.show(); //this.age: 19 this.name: ssss

//11.继承内置类型的构造函数
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}
let m = new MyArray(3, 5, 9);
console.log('m:', m); //m: MyArray [ 3, 5, 9 ]