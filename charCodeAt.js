function alphabet() {
  const end = 122,
        series = [],
        obj = {};

  for (let i = 97, j = 1; i <= end; i++, j++) {
    series[j] = String.fromCharCode(i);
    obj[series[j]] = j;
  }

  return obj;
}

// 类库必须做类型验证，自己写自己用的函数则可以省略。
function getSeries(chars, mapObject) {
  return chars.map(char => mapObject[char]);
}

const alpha = alphabet();
const result = getSeries(['h', 'n', 'x', 'y', 'd', 's'], alpha);
console.log(result);
