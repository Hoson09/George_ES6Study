// {
//     var a = 10;
//     console.log(a); //=>10
// }
// console.log(a);

fun();

function fun() {
    console.log(a);
    var a = 100;
    console.log(a);
}

//2.let 声明变量 没有变量提升，而且有暂时性死区

{
    console.log(b); //这里会报错，因为你在声明前调用了。ReferenceError: b is not defined
    let b = 'huyi';
    console.log(b);
}

//3.配合for循环可以解决之前的问题
//快捷键 control + alt + n可以运行全部代码，也可以运行单独选中的代码。

for (var i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 10);
}
//打印出来的结果是10个10。
//如果要让他打印出来显示1，2，3，4，5....，10；就要用闭包的方法(自执行函数)来解决这个问题。

for (var i = 0; i < 10; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j);
        }, 4);
    })(i);
}
//也可以用let声明变量的方式,来解决循环索引的问题,因为用let声明的变量拥有了块级作用域，和自执行函数的作用相同，而之前用var声明的变量是没有块级作用域的

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 4)
}

//4.let不能重复声明变量 
let w = 100;
let w = 10; //SyntaxError: Identifier 'w' has already been declared

//5.let在全局作用域下声明的变量不会添加到全局对象上去。
var a = 10;
console.log(window.a); //=>10
let b = 20;
console.log(window.b); //=>undefined