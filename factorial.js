// function factorial(n) {
//   if (n === 1) {
//     return 1;
//   }
//   return factorial(n - 1) * n;
// }

// fibonacci 数列的计算 学习递归
// ·F0 = 0
// ·F1 = 1
// ·Fn = Fn – 1 + Fn – 2
// function fibonacci(n) {
//   if (n === 0 || n === 1) {
//     return n;
//   }
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }
// 这个计算很费时间，比如n=30的时候需要好几秒，40就不用说了，所以有必要做一个缓存。
// 因为是递归调用，所以每次计算都会把前面的队列记录下来，以后再用到前面队列这两个的值直接取出返回，不用计算。
// 加了缓存速度快多了，600位的数据尼玛简直是秒出，太假了。

function fibonacci(n) {
  // 加一个缓存
  if (typeof fibonacci.memory !== 'object') {
    fibonacci.memory = {};
  }

  let result;
  const _fibonacci = () => {
    if (n === 0 || n === 1) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  if (n in fibonacci.memory) {
    return fibonacci.memory[n];
  }

  result = _fibonacci(n);
  fibonacci.memory[n] = result;
  return result;
}

console.log(fibonacci(5));
