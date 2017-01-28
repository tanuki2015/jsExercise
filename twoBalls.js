// 双色球算号器
// 红球6个，01~33， 篮球一个：01~16
function calculate() {
  const red = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
        result = [];

  const random = (n, m) => {
    return Math.round(Math.random() * (m-n) + n);
  };

  const getRed = () => {
    //  产生随机数后取red数组下标，直接push进结果数组，然后在原数组中删除这一项，不会有重复，可以省略是否重复的判断
    for (let i = 0; i < 6; i++) {
      const len = red.length;
      const index = random(1, len) - 1;
      result.push(red[index]);
      red.splice(index, 1);
    }
  };

  const getBlue = () => result.push(random(1, 16));

  getRed();
  result.sort((a, b) => a - b);
  getBlue();

  return result;
}

function getSeries(stake) {
  for (let i = 0; i < stake; i++) {
    console.log(calculate());
  }
}

getSeries(5);
