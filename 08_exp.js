//1. 正则表达式 构造函数升级
const exp1 = /\d+/gim; //匹配一个或者多个数字，g是全局，i是不分大小写，m是多行。
//用构造函数创建正则表达式
const exp2 = new RegExp('\d+', 'g');

const exp3 = new RegExp(/\d+/gi); //es5 支持的方式 但是es5中不允许传入第二个参数。

//es6增强正则表达式 可以传入第二个参数
const exp4 = new RegExp(/\d+/gi, 'im'); //第二个参数是设置flag，修饰符，这个修饰符会把前面的正则表达式的后面替换掉。
//还可以查看flags
console.log(exp4.flags); //im
const exp5 = new RegExp(/\d+/gi);
//还可以查看flags
console.log(exp5.flags); //gi

//2.增加修饰符u u为Unicode模式，用来处理大于\uFFFF范围的 Unicode字符
let s = '𠮷';
console.log(/^.$/gi.test(s)); //false
console.log(/^.$/giu.test(s)); //true

//3.y修饰符，叫做粘连修饰符 后一次匹配都是从上一次匹配成功的下一个位置开始
//全局匹配 g
const str = '2344bb33dd89';
const exp1 = /\d{2}/g;
let t;
while (t = exp1.exec(str)) {
    console.log(t);
}
//粘连匹配 y
const str = '2344bb33dd89';
const exp1 = /\d{2}/y;
let t;
while (t = exp1.exec(str)) {
    console.log(t);
}

//4. s 修饰符 表示可以匹配任何一个字符,不仅可以匹配超过\uFFFF的字符也可以匹配\n等换行符。
console.log(/./s.test('\n')); //true
console.log(/./s.test('𠮷')); //true

//5. 具名匹配 Named Capture Groups 允许为每一个组匹配指定一个名字
const exp2 = /(?<num1>\d+)(?<num2>-\d+-)/;
console.log(exp2.exec('2222-3333-aa'));
//打印出来是：
// [ '2222-3333-',
// '2222',
// '-3333-',
// index: 0,
// input: '2222-3333-aa',
// groups: [Object: null prototype] { num1: '2222', num2: '-3333-' } ]

//还支持解构赋值
const exp2 = /(?<num1>\d+)(?<num2>-\d+-)/;
let { groups: { num1, num2 } } = exp2.exec('2222-3333-aa');
console.log(num1);
console.log(num2);

//6. 新增属性
RegExp.prototype.flags //读取修饰符
RegExp.prototype.sticky //y 黏连修饰符
RegExp.prototype.unicode //u Unicode 可以读取超出\uFFFF范围的字符。