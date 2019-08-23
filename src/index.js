//从一个文件中导出的模块都是同一个对象
//模块的变量是延迟执行的，用到的时候 才会去拿那个值。
import { a, b, c, show, age, name, AddAge } from './b'; //js后缀可以省略。 
import * as aicoder from './b';
//当import一个变量名进来的时候，这个变量名指向的是引入文件的default值。
import slk from './b';
show();
AddAge(10);
show();
aicoder.show();
console.log('slk:', slk);
//如果只是想让文件执行以下，不使用文件的东西，那么就直接import 文件名即可
import './c';

// 运行顺序如下： es6模块是静态解析的，先静态解析import 引入的文件，然后再进行下面的代码的执行。
// c.js 执行了
// a: 1
// b: 2
// name: aicoder
// c: 3
// age: 19
// a: 1
// b: 2
// name: aicoder
// c: 3
// age: 29
// a: 1
// b: 2
// name: aicoder
// c: 3
// age: 29
// slk: 22