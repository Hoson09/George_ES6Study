//1.Set类型，它类似于数组，但是成员的值都是唯一的，没有重复的值
let s = new Set();
s.add(1);
s.add('1');
s.add(0);
s.add(1); //无效。因为Set集合中已经存在了1
console.log('s.size:', s.size); //s.size: 3  Set类型的size方法和之前的length差不多
console.log('s:', s); //s: Set { 1, '1', 0 }

//2. Set 函数可以接受一个数组（或者具有iterable接口的其他数据结构）作为参数用来初始化
//接受一个可遍历的对象，比如字符串，NodeList接口
let s = new Set([1, 2, 3, 4]);
console.log('s:', s); //s: Set { 1, 2, 3, 4 }

// Set内部判断两个值是否相同的 使用的是算法叫做‘same-value-zero equality’,类似于精确运算符（===）但是唯一的区别是Set认为NaN与NaN是相等的。0与-0是相等的。
s.add(NaN);
s.add(NaN);
s.add(NaN);
s.add(NaN);
s.add(0);
s.add(-0);
console.log('s:', s); //s: Set { 1, 2, 3, 4, NaN } s: Set { 1, 2, 3, 4, NaN, 0 }

//3.Set.prototype.size 返回成员总个数
//4.Set 4个实例操作方法
let s = new Set([1, 2, 3.4, 5]);
//add(val)添加某个值
// delete(val)删除某个值
s.delete(1);
console.log('s:', s); //s: Set { 2, 3.4, 5 }
//has(val);返回bool
console.log('s.has(5):', s.has(5)); //s.has(5): true
//clear() 清除所有成员
s.clear();
console.log('s:', s); //s: Set {}

//5.Set结构转化成为数组
//数组去重，展开运算符
let s = new Set();
s.add(1);
s.add(2);
s.add(3);
let arr = [...s];
console.log('arr:', arr); //arr: [ 1, 2, 3 ]

// Array.from() //把一个可遍历的对象转化成一个真正的数组
let arr2 = Array.from(s);
console.log('arr2:', arr2); //arr2: [ 1, 2, 3 ]

//6.Set结构的实例有四个遍历的方法
//keys() 返回键名的遍历器
let s = new Set([1, 3, 35]);
console.log('s.keys():', s.keys()); //s.keys(): [Set Iterator] { 1, 3, 35 }
console.log('s.values():', s.values()); //s.values(): [Set Iterator] { 1, 3, 35 }
console.log('s.entries()', s.entries()); //s.entries() [Set Iterator] { 1, 3, 35 }
//values() 返回键值的遍历器。也可以直接遍历Set结构和values()
//entries() 返回键值对的遍历器
//forEach() 使用回调函数遍历每个成员。
s.forEach((item, index, arr) => {
    console.log('item:', item);
    console.log('index:', index);
}); //和数组有些区别
// item: 1
// index: 1
// item: 3
// index: 3
// item: 35
// index: 35

//7.WeakSet 允许将一个弱保持对象存储在一个集合中。
//weakset() 只能存放对象引用，不能存放值
//WeakSet() 是弱引用，如果没有其他的变量或者属性引用这个对象值，那么这个对象值会被当做垃圾回收掉。
let ws = new WeakSet();
let a = { a: 'sss' };
let b = { b: '222' };
ws.add(a);
ws.add(b);
console.log('ws:', ws); //ws: WeakSet { [items unknown] }
ws.delete(a);
console.log(ws.has(b)); //true
console.log('ws:', ws); //ws: WeakSet { [items unknown] }

//当a为null会直接被gc回收，gc回收时不会考虑ws的引用问题。

//8.Map的数据结构类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值都可以当做键
//构建Map对象，要使用new关键字 可以传入可遍历的对象
let map = new Map();
let a = { a: 123 };
let b = new Number(20000);
map.set(a, { age: 19 });
map.set(b, 198);
map.set('1234', b);
console.log('map:', map); //map: Map { { a: 123 } => { age: 19 }, [Number: 20000] => 198,'1234' => [Number: 20000] }
//可以传入可遍历的对象
let map = new Map([
    [{ a: 19 }, 2222],
    [2, 'aicoder']
]);
console.log('map:', map); //map: Map { { a: 19 } => 2222, 2 => 'aicoder' }

//9.Map的属性和操作方法
let map = new Map([
    [{ a: 19 }, 2222],
    [2, 'aicoder']
]);
//size 长度
console.log('map.size:', map.size); //map.size: 2
//set(key,value);设置值
//set()返回的是当前的Map对象，因此可以采用链式写法。
map.set('aaa', 'huyi').set({ 'demo': 'aicoder' }, 2134);
console.log('map:', map); //map: Map {{ a: 19 } => 2222,2 => 'aicoder','aaa' => 'huyi',{ demo: 'aicoder' } => 2134 }

//get(key),如果找不到key值则返回undefined。
console.log(map.get(2)); //aicoder
console.log(map.get(1)); //undefined

//has(key)
//delete(key)
//clear()

//10.Map的遍历方法 keys()  values() entries() forEach()
let map = new Map([
    [1, 1],
    [2, 'aicoder'],
    [{ 'a': 333 }, 'str']
]);
console.log('map.keys():', map.keys()); //map.keys(): [Map Iterator] { 1, 2, { a: 333 } }
// keys()可以配合for...of
for (let key of map.keys()) {
    console.log('key:', key); //key: 1 key: 2 key: { a: 333 }

}
for (let key of map.keys()) {
    console.log('value:', map.get(key)); //value: 1 value: aicoder value: str
}
console.log('map.values():', map.values()); //map.values(): [Map Iterator] { 1, 'aicoder', 'str' }
console.log('map.entries():', map.entries()); //map.entries(): [Map Iterator] { [ 1, 1 ], [ 2, 'aicoder' ], [ { a: 333 }, 'str' ] }

map.forEach((item, key, map) => {
    console.log('item:', item); //item: 1 item: aicoder item: str
    console.log('key:', key); //key: 1  key: 2 key: { a: 333 }
});

//11.WeakMap结构与Map结构类似，也是用于生成键值对的集合
//WeakMap只接受对象作为键名（null除外），不接受其他类型值的作为键名
//WeakMap的键名所指向的对象，不计入垃圾回收机制。与WeakSet相同 ，当键值对被移除的时候WeakMap是不会受影响的。
//WeakMap只有四个方法可以用：get(),set(),has(),delete()
//size 遍历方法 clear 等方法都不可用。
let wm = new Map();
wm.set(dom, { age: 19 }); //dom和{ age: 19 }都会被移除，而不会被影响