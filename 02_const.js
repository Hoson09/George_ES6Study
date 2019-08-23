//1.const声明后，需要立即赋值，后续不能修改，只能读取。

// const a = 10;
// a = 19;//(会报错)TypeError: Assignment to constant variable.
// const b;//SyntaxError: Missing initializer in const declaration
// b = 100;

//2.const声明的变量也是有暂时性死区的。
{
    // console.log(a);ReferenceError: a is not defined
    const a = 100;
    console.log(a);
}

//3.const与复杂类型
const stu = {}; //要求指向的具体的内存地址不能修改。但是这个引用类型的内部的数据是可以修改的。
stu.age = 20;
console.log(stu);

//4.const类型声明的变量也不属于全局变量的属性。(在全局声明的也不是全局对象window的属性，不能被window调用)
const m = 'sss';
console.log(window.m); //=>undefined

//5.const不允许重复声明。

//代码编写遵循最小权限原则。优先使用const 然后才是let，然后是var