const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('等待2秒');
    },2000);
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('等待3秒');
},3000);
    });

// 单纯的promise用法
// promise2
//     .then(result => console.log(result))
//     .catch(error => console.log(error));
//
// promise3
//     .then(result => console.log(result))
//     .catch(error => console.log(error));

// promise.all的用法
const promiseAll = Promise.all([promise2, promise3]);
promiseAll
    .then(result => console.log(result))
    .catch(error => console.log(error));


// then的链式写法......
// 解决generator和co库解决异步问题。
// es7 的 async 终极解决方案