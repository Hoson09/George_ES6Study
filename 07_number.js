//1.二进制与八进制
let a = 0o77; //八进制以0O或者0o开头
let b = 0b11; //二进制以0b或者0B开头
console.log('b:', b);
console.log('a:', a); //打印出来的都是十进制的数。
//将八进制和二进制转化成为十进制
console.log(Number(0o111));
console.log(Number(0b111));

//2. Number.isFinite(),Number.isNan() 数字判断增强，全局方法添加到Number的静态方法
//之前的全局方法。
console.log(isFinite(1.2)); //true
console.log(isFinite(Infinity)); //false
console.log(isFinite(NaN)); //false
console.log(isFinite('1')); //true 非数字类型先隐式转换成数字类型然后在判断是否是有限的数字
console.log(isFinite('2s')); //false 非数字类型先隐式转换成数字类型然后在判断是否是有限的数字
console.log(isFinite(true)); //true  非数字类型先隐式转换成数字类型然后在判断是否是有限的数字

console.log(isNaN(NaN)); //true
console.log(isNaN(Infinity)); //false
console.log(isNaN(22)); //false
console.log(isNaN('aa')); //true 先隐式转换 number('aa')==>NaN 然后在isNaN(NaN)==>true

//新增的Number.isFinite(),Number.isNan() 这个方法是不会进行隐式转换的。
console.log(Number.isNaN(NaN)); //true
console.log(Number.isNaN(15)); //false
console.log(Number.isNaN('15')); //false
console.log(Number.isNaN(true)); //false
console.log(Number.isNaN(9 / NaN)); //true
console.log(Number.isNaN('true' / 0));
// true
console.log(Number.isNaN('true' / 'true'));
//true
console.log(Number.isNaN('sss')); //false

console.log(Number.isFinite(15)); //true
console.log(Number.isFinite(8.8)); //true
console.log(Number.isFinite(NaN)); //false
console.log(Number.isFinite(Infinity)); //false
console.log(Number.isFinite(-Infinity)); //false
console.log(Number.isFinite('sss')); //false
console.log(Number.isFinite('15')); //false
console.log(Number.isFinite('true')); //false

//ES6新增的Number.parseInt(),Number.parseFloat() 和 parseInt()和parseFloat()用法相同。

//4. Number.isInteger()判断是否是一个整数

//5.Number.EPSILON,ES6 在Number对象上面增加了一个极小的常量Number.EPSILON。这个常量表示1与大于1的最小浮点数之间的差值。
console.log(Number.EPSILON);
console.log(0.1 + 0.2 - 0.3 < Number.EPSILON); //true

//6.安全整数 Number.isSafeInteger()
//js能够准确表示的证书范围在-2^53到2^53次方之间（不含两个端点），超过这个范围的数就无法精确表示了。
console.log(Number.isSafeInteger(3333333333)); //true

//7.Math对象的扩展

//7.1指数运算符**
console.log(Math.pow(2, 4)); //16 = 2^4;
console.log(2 ** 5); //32 = 2^5;

//7.2Math.trunc()方法去除一个数的小数部分，返回整数部分
console.log(Math.trunc(123.23422)); //123
console.log(Math.trunc('2.333')); //2 先把字符串转化成数字类型 然后再进行处理
//对于空值和无法截取整数的值，返回NaN
console.log(Math.trunc(NaN)); //NaN
console.log(Math.trunc('2.3ss33')); //NaN

//7.3 判断数字的符号 Math.sign();
console.log(Math.sign(22)); //1
console.log(Math.sign(-23)); //-1
console.log(Math.sign(0)); //0
console.log(Math.sign(-0)); //-0
console.log(Math.sign('-22')); //-1
console.log(Math.sign('22')); //1
console.log(Math.sign('-ss')); //NaN

//7.4Math.cbrt()计算一个数的立方根
console.log(Math.cbrt(8)); //2

//7.5Math.hypot()返回所有参数的平方和的平方根

console.log(Math.hypot(3, 4)); //5
console.log(Math.hypot(300, 400)); //500

//还有各种取指数 取对数 等等数学操作的函数，详情请看官方文档