//1. js允许采用\uxxxx形式表示一个在(十六进制)\u0000~\uFFFF之间的字符 (这是Unicode编码的字符)
let x = '\u0061';
let y = '\u0062';
let z = '\u0063';
console.log('x:', x);
console.log('y:', y);
console.log('z:', z);
//2.超出\u0000~\uFFFF范围的字符，必须用两个双字节的形式表示。

let a = '\uD842\uDFB7';
console.log('a:', a);

//3.还可以使用{}把码点包裹住,码点就是编码符号\u之后的部分就是一个字符的码点。
let d = '\u{20BB7}';
console.log('d:', d);
//比如之前的let x = '\u0061'; 如果使用{}包裹码点的话可以把61前面的00给省略掉，为let x = '\u{61}';这样也是可以的。

//4. js中的字符表示方法汇总
let a = '\z';
let b = '\172'; //八进制表示法
let c = '\x7A'; //十六进制表示法
let d = '\u007A'; //unicode制表示法
let e = '\u{7A}'; //
console.log('a:', a); //a: z
console.log('b:', b); //b: z
console.log('c:', c);
console.log('d:', d);
console.log('e:', e);

//5.字符串的方法：charCodeAt(index),获得字符的码点

let s = '𠮷'; //这个是生僻字超出了范围，因此具有两个双字节。而没有超出范围的都只是一个双字节。
console.log(s.charAt(0)); //这个方法只能处理常见字，处理不了超出范围的生僻字。如果处理生僻字会乱码。
console.log(s.charAt(1));
console.log(s.charCodeAt(0)); //55362，这个是十进制的第一个双字节的码点，可以自行转换成一个十六进制的码点
console.log(s.charCodeAt(1)); //57271，这个是十进制的第二个双字节的码点，可以自行转换成一个十六进制的码点
console.log(s.length); //因为生僻字超出范围所以字节长度是2.

//6.String.fromCodePoint(num) 通过码点返回字符
console.log(String.fromCodePoint('0x7a')); //=>z

//7.字符串的遍历器接口，能正确识别超过大于0xffff码点范围的字符

let s = '𠮷';
// //使用之前的方法：
// for (var i = 0; i < s.length; i++) {
//     console.log('s[i]', s[i]);
// }
// //打印出来的结果：s[i] �   s[i] �
// //这是无法打印出来生僻字的字符。

//使用es6的新增的方法：
for (let k of '你好哈𠮷') {
    console.log('k:', k);
}
//打印出来的结果：
// k: 你
// k: 好
// k: 哈
// k: 𠮷

//8.字符串新增的方法：includes(),startsWith(),endsWith()
let s = '123456';
console.log(s.includes('34')); //=>true
console.log(s.startsWith('1')); //=>true
console.log(s.endsWith('6')); //=>true
//这三个方法都可以支持第二个参数，表示开始搜索的位置
console.log(s.includes('34', 5)); //=>false

//9.repeat() repeat方法返回一个新字符串，表示将原字符串重复n次
let m = 'huyi';
console.log(m.repeat(2));
console.log(m.repeat(0)); //返回空字符串
console.log(m.repeat(-1)); //RangeError: Invalid count value 不能为负数和infinity。如果是小数，也会取整数部分。

//10.padStart(),padEnd() 给字符串进行补齐，第一个参数是补齐的位数，第二个参数是需要用来补齐的字符串。
let k = '12';
console.log(k.padStart(5, 'ad'));
console.log(k.padEnd(5, 'ad'));

//11.模板字符串的基础
let s1 = `<div>
<h3>你好</h3>
<p>这里是</p>
</div>`;
console.log(s1);

//把数据动态添加到标签里面去 有拼接字符串和前端模板字符串两种方法
//1.
let [a1, a2] = [9, 10];
let tempStr = '';
tempStr += '<p>' + a1 + '</p>';
tempStr += '<p>' + a2 + '</p>';
console.log('tempStr:', tempStr);
//2.
let s2 = `<p>${a1}</p>
<p>${a2}</p>`;
console.log('s2:', s2);
//模板支持运算
let s2 = `<p>${a1*2}</p>
<p>${a2}</p>`;
console.log('s2:', s2);
//支持函数调用
function add(a, b) {
    return a + b;
}
let [a, b] = [10, 20];
let s3 = `===>${2*add(a,b)}`;
console.log(s3);

//12.模板字符串高级
//模板字符串嵌套
let t = `<ul>
${[1,2,3,4,5].map((item)=>{
 return `<li>${item}</li>`;
}).join('')}
</ul>`;
console.log(t);
//标签模板
let [a1,a2] = ['$','%'];
function add(){
console.log('arguments:',arguments);//arguments: [Arguments] { '0': [ 'a', '-', '==' ], '1': '$', '2': '%' }
};
add`a${a1}-${a2}==`;//先把这个模板字符串根据占位符${}分割开来，形成一个数组，对应伪数组中的'0'属性的属性值，然后'1'属性对应的属性值是第一个第一个占位符中的内容，'2'属性对应的是第二个占位符中的内容