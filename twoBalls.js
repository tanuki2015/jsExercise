// 双色球算号器
// 红球6个，01~33， 篮球一个：01~16

function calculate() {
  const red = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
        blue = [1,2,3,4,5,6,7,8,9,10,11,12,13],
        result = [];

  const random = (n, m) => {
    return Math.round(Math.random() * (m-n) + n);
  };

  const ifInResult = (num) => {
    if (result.length > 0) {
      return result.some(item => item === num);
    }
  };

  const getRed = () => {
    let number;
    while (result.length <= 6) {
      number = random(1, 33);
      const sameNum = ifInResult(number);
      if (sameNum) {
        continue;  // 有重复数字，这次循环不算。
      }
      result.push(number);
    }
  };

  getRed();
  return result;
}

for (let i = 0; i < 100; i++) {
  console.log(calculate());
}
