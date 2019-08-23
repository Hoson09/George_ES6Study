//1.用原生node.js 实现读取文件并写入文件。(要求读取两个文件，然后把两个文件内容写入到一个文件中。)
const fs = require('fs');
const { join } = require('path');
const fileName1 = join(__dirname, '02_const.js');
const fileName2 = join(__dirname, '03_array_des.js');
const writeFileName = join(__dirname, 'a.js');
fs.readFile(fileName1, 'utf8', function(error, data) {
    if (error) {
        throw error;
    }
    fs.readFile(fileName2, 'utf8', (error2, data2) => {
        if (error2) {
            throw error2;
        }
        let dataFileString = data + data2;
        fs.writeFile(writeFileName, dataFileString, 'utf8', function(error) {
            console.log('写入完成');
        });
    });
});
//2. 使用promise的写法  
const fs = require('fs');
const { join } = require('path');
const fileName1 = join(__dirname, '02_const.js');
const fileName2 = join(__dirname, '03_array_des.js');
const writeFileName = join(__dirname, 'a.js');

function readFilePromise(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
}
let data;
readFilePromise(fileName1)
    .then(data1 => {
        data = data1;
        return readFilePromise(fileName2);
    })
    .then(data2 => {
        data += data2;
        return data;
    })
    .then(data => {
        fs.writeFile(writeFileName, data, 'utf8', error => {
            if (error) {
                console.log(error);
            }
        });
    }).catch(e => {
        console.log('出现了一个未处理的异常信息');
        console.log('e:', e);
    });

//3.原生generator函数的实现
const fs = require('fs');
const { join } = require('path');
const fileName1 = join(__dirname, '02_const.js');
const fileName2 = join(__dirname, '03_array_des.js');
const writeFileName = join(__dirname, 'a.js');

let g;

function* joinFile() {

    let fileData1 = yield fs.readFile(fileName1, 'utf8', (error, data) => {
        g && g.next(data);
    });
    let fileData2 = yield fs.readFile(fileName2, 'utf8', (error, data) => {
        g && g.next(data);
    });
    fs.writeFile(writeFileName, fileData1 + fileData2, 'utf8', error => {
        if (error) {
            throw error;
        }
        console.log('写入成功');
    });
}

//因为在es6中不存在变量提升，并且具有间歇性死区，所以要在声明完函数后在把函数给变量赋值
g = joinFile(); //g 遍历器对象
g.next();

//4.Thunk函数，把回调函数提到generator函数外面。
function readFileThunk(fileName) {
    return function(cb) {
        return fs.readFile(fileName, 'utf8', cb);
    }
}
// readFileThunk(fileName1)(function(error, data) {
//     console.log('data:', data);
// });

const fs = require('fs');
const { join } = require('path');
const fileName1 = join(__dirname, '02_const.js');
const fileName2 = join(__dirname, '03_array_des.js');
const writeFileName = join(__dirname, 'a.js');

function readFileThunk(fileName) {
    return function(cb) {
        return fs.readFile(fileName, 'utf8', cb);
    }
}

function* joinFileThunk() {
    let data1 = yield readFileThunk(fileName1); //{value:f done:false}
    let data2 = yield readFileThunk(fileName2); //{value:f done:false}
    fs.writeFile(writeFileName, data1 + data2, 'utf8', error => {
        if (error) {
            console.log('error:', error);
        }
    })
}
let gen = joinFileThunk();
gen.next().value((error, data) => {
    if (error) {
        throw error;
    }
    gen.next(data).value((error, data) => {
        gen.next(data);
    });
});
//5.Thunk的自动执行 递归回调
const fs = require('fs');
const { join } = require('path');
const fileName1 = join(__dirname, '02_const.js');
const fileName2 = join(__dirname, '03_array_des.js');
const writeFileName = join(__dirname, 'a.js');

function readFileThunk(fileName) {
    return function(cb) {
        return fs.readFile(fileName, 'utf8', cb);
    }
}

function* joinFileThunk() {
    let data1 = yield readFileThunk(fileName1); //{value:f done:false}
    let data2 = yield readFileThunk(fileName2); //{value:f done:false}
    fs.writeFile(writeFileName, data1 + data2, 'utf8', error => {
        if (error) {
            console.log('error:', error);
        }
    })
}

function run(gen) {
    let g = gen(); //遍历器
    function nextStep(data) {
        let temp = g.next(data);
        if (!temp.done) {
            temp.value(function(error, data) {
                nextStep(data);
            });
        }
    }
    nextStep();
}
run(joinFileThunk);

//6.通过promise来改造自执行。

//7.co库。