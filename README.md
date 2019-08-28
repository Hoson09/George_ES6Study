# es6学习总结
> 仅为本人学习总结笔记。

## 目录
### 1.[es5回顾](#divtop1)
### 2.[es6_let](#divtop2)
### 3.[es6_const](#divtop3)
### 4.[es6_array_des](#divtop4)
### 5.[es6_object_des](#divtop5)
### 6.[es6_other_des](#divtop6)
### 7.[es6_string_extend](#divtop7)

## 1. es5回顾
<div id="divtop1"><div>

### (1)strict模式
严格模式，限制一些用法，'use strict';
> 为什么使用严格模式:
> * 消除代码运行的一些不安全之处，保证代码运行的安全；
> * 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
> * 提高编译器效率，增加运行速度；
> * 为未来新版本的Javascript做好铺垫。


## 2. es6_let
<div id="divtop2"><div>

## 3. es6_const
<div id="divtop3"><div>

## 4. es6_array_des
<div id="divtop4"><div>

## 5. es6_object_des
<div id="divtop5"><div>

## 6. es6_other_des
<div id="divtop6"><div>

## 7. es6_string_extend
<div id="divtop7"><div>


# 知识点总结：
- es6 是w3c委员会制定的js的最新国际标准版本 全称：ECMAScript 欧洲计算机协会制定的 script 标准。 以及制定标准的流程？。
- css标准怎么制定？
- let var const 变量声明以及块级作用域。（{ let } 这就生成一个块级作用域。）
- 数组解构赋值 对象解构赋值 函数解构赋值 
- let {x,y,...a} = {x:2,y:5,a:5,b:3};
- 统计字符长度，让汉子的length为2，英文的length为1的方法？？？？！！！这样可以设计一个文本框的字数设定。
- 正则 匹配号码，匹配邮箱 匹配姓名。基础。。。
- 函数的arguments对象可以获取实参个数。函数名的length获取形参可数。 但是es6之后给函数加入函数默认值后，获取形参个数的方法得出的结果会失真。
- rest参数: ...a 。 这个参数在一个函数中只能有一个，且只能放到函数形参的最后。rest参数是一个数组类型。这个rest参数可以获取传入实参的所有剩余实参，这样就可以代替arguments伪数组来使用了。
- js语言中一个函数在声明的时候就已经确定了作用域，以后不管在那里调用，这个函数的作用域链都是已经确定好了的，这个函数的内部变量赋值的时候只能先从自己的作用域寻找，如果找不到就沿着作用域链向上一级(父级)的作用域寻找相应的值，直到最后还找不到，就赋值为undefined。
- 箭头函数{ }内部只有一行代码表达式的时候，{}可以省略，return也可以省略，但是这样也是会return返回值的，返回的值就是那一行代码运行得到值。

- 作业题：Vue 组件内部递归访问自己 实现多级菜单。

## 数组:
- filter((item,index) => {});的用法
- find() findIndex()
- let t = new Array(20); t.fill(0); console.log(t); fill()方法？？？
- 作业2： 计数排序法？？
- repeat()方法？？？

## 属性的简洁语法
- 如果属性和属性值相同的话，可以写一遍即可。这就是简洁写法。

- Object.assign({},{}); //后面的对象添加到前面的对象上，但并不会产生新的对象。

- 深拷贝 jsonstringify() jsonparse(),  for 递归, lodash ,jquery.extend(true,obj), assigin();

- let k = {}; k.age = 19; 默认可写，可读，可配置，可以删除（非严格模式下）。Object.defineProperty(k,'name',{属性值的设置中如果使用value：function（）{}那么就不能使用get(){},set(){}了}) 这是规定。

## 发布订阅模式

```js

let hu = {
  notice(data){
    this.subscribers.forEach(item=>item(data));
  },
  subscribers:[]
};
let ren ={
  run(data){
    console.log('ren run',data);
  }
}
let huo = {
  stop(data){
    console.log('huo stop',data);
  }
}

hu.subscribers.push(huo.stop);
hu.subscribers.push(ren,run);
hu.notice('98℃');

//发布订阅模式的改造提升...



```

## class类

```js
class Animal {
  constructor(){
    this.age = 222;
    this.name = 'sss';
  }
  show(){//这个方法是设置在构造上函数实例的内部原型上的方法

  }
  get Name(){

  }
  set Name(val){

  }
  ff = 90;//这个代表的是改造函数实例上设置的方法和在constructor函数内部this上设置的属性比如age,是一样的效果。
  static showFun(){//static 代表是在构造函数上的方法

  }
  static hh =902;//static 代表是在构造函数上的属性的设置。
}

// Object.create(anmial.prototype); es5原型继承方法？？？？

class Cat extends Animal{//es6的继承方法
  constructor(name,age.color){
    super(name,age);
    this.
  }
}

```

```js
var a = 'name';
let k = {
  [a]:'kkk', //一个属性名可以是字符串，现在在es6中属性名也可以是一个变量，可以进行运算，调用函数等等。但是要加[]才行。
  a:'3'
}
console.log('k:',k);//

```

## modul 模块化导入。。。
```js
import b form './b';// b === default.???好好看看。

```

## promise对象的用法,以及与async函数配合使用改造！！！？？、

```js
/ ajax 异步处理

// 第一种：
let service ={
  getUser(cb) {
    // $.get('/api/getUser', cb);
    $.ajax({
      url: '',
      success: cb
    });
  }
};

service.getUser({age:  19}, function(data) {
  // 绑定data到 模板=》 html=> 页面上去
});
// 第二种： promise方法

let service ={
  getUser() {
    return new Promise((resolve, reject) => {
      // $.get('/api/getUser', cb);
      $.ajax({
        url: '',
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      });
    })
  }
};

// congtroller
service.getUser({age:  19}).then(res => {
  console.log(res);
})

// 第三版本： async await

let service ={
  async getUser() {
    return new Promise((resolve, reject) => {
      // $.get('/api/getUser', cb);
      $.ajax({
        url: '',
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      });
    })
  }
};

// congtroller
(async function() {
  let t = await service.getUser({age:  19});
})();
```

## left 和  translate() 回流 和 重绘的 区别。以及性能提升。

## 事件循环机制 

## for of 与 for in的区别。


