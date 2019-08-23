//1.iterator可遍历器
//之前的方法
let s = {
    age: 19,
    name: 'aicoder'
}
for (let k of Object.keys(s)) {
    console.log('keys:', k); //keys: age keys: name
}
for (let k of Object.values(s)) {
    console.log('values:', k); //values: 19 values: aicoder
}

//书写一个可遍历器
//自定义任意一个对象，然后让这个对象实现不用借助Object.keys()等方法直接拥有可遍历性,进行for...of循环
let m = {
    data: [1, 3, 4, 'huyi'],
    [Symbol.iterator]() { //这是对一个对象的Symbol.iterator属性的改写，如果一个对象想拥有可遍历性，那么他就要在这个值中进行设置，一般不可遍历的对象这个属性的属性值为undefined。
        let self = this;
        return {
            next() { //这个可遍历器需要拥有的这个next()方法每次执行完都返回一个{value:返回的值,done:是否结束的标志}
                if (self._index === undefined) {
                    self._index = 0;
                }
                let t = {
                    value: self.data[self._index], //返回的值
                    done: self._index === self.data.length - 1 //表示是否结束
                }
                self._index += 1;
                return t;
            }
        }
    }
}

//遍历器写好后可以直接进行遍历循环
for (let k of m) {
    console.log('k:', k); //k: 1 k: 3 k: 4 
}

//2.具备原生 iterator
// Array
// Map
// Set
//String
//TypedArray
//函数的arguments
//NodeList对象
console.log(Array.prototype[Symbol.iterator]); //[Function: values]天然拥有可遍历性
function add() {
    console.log('可遍历性:', arguments[Symbol.iterator]); //可遍历性: function values() { [native code] }

}
add(1, 2, 3, 4, 5, 2, 3);

//3.伪数组部署遍历器
let s = {
    0: 1,
    1: 'huyi',
    2: {},
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator] //把任意一个伪数组的可遍历属性指向数组的可遍历属性，那么这个伪数组就具有了可遍历性。
};
for (let val of s) {
    console.log('val:', val); //val: 1 val: huyi val: {}
}