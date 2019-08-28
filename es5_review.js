// 1.严格模式
"use strict";
x = 456;
console.log(x); //ReferenceError: x is not defined

"use strict";
var x = 324;
delete x; //SyntaxError: Delete of an unqualified identifier in strict mode.

"use strict";
var obj = {};
Object.defineProperty(obj, "x", { value: 0, writable: false });
obj.x = 345; // 报错 不允许对只读属性赋值 TypeError: Cannot assign to read only property 'x' of object '#<Object>'
​
"use strict";
var eval = 234; //SyntaxError: Unexpected eval or arguments in strict mode

"use strict";
with(Math) { x = cos(2) }; // yntaxError: Strict mode code may not include a with statement

"use strict";
eval("var x = 2");
alert(x); //eval内部创建的变量不能被调用 严格模式下

function f() {
    console.log(this); //this指向 window 或者 global对象。
}
f();

"use strict";

function f() {
    console.log(this); //严格模式下,函数的调用的this===>undefined
}
f();

// 2.数组新增方法

//foreach()
[1, 2, 34, 5].forEach((value, index, arr) => {
    console.log(value, index);
}); //foreach不会返回新数组

//map()
var arr = [3, 4, 5, 5];
arr.map((value, index, arr) => {
    return value + index;
});
console.log(arr); //map方法会返回一个新数组

//filter() 过滤
var a = [1, 3, 4, 5, 0].filter(item => {
    return item == "3";
}); //遍历整个数组，如果有和3相等的数就返回一个boolean类型 true。