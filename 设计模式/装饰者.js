// js模式 p156
// 明显的错误， 1。 this.price 值为true。 2. 计算过程错误，重复收税。
// 用函数式的方式更简单，见后面。

// function Sale(price) {
//   this.price = (price > 0) || 100;
//   this.decorators_list = [];
// }
//
// Sale.decorators = {};
// Sale.decorators.fedtax = {
//   getPrice: function (price) {
//     return price + price * 3 / 100;
//   },
// }
// Sale.decorators.quebec = {
//   getPrice: function (price) {
//     return price + price * 2 / 100;
//   },
// }
// Sale.decorators.money = {
//   getPrice: function (price) {
//     return "￥" + (price * 7);
//   },
// };
//
// Sale.prototype.decorate = function (decorator) {
//   this.decorators_list.push(decorator);
// };
//
// Sale.prototype.getPrice = function () {
//   var price = this.price,
//   i,
//   max = this.decorators_list.length,
//   name;
//
//   for(i = 0; i < max; i++){
//     name = this.decorators_list[i];
//     price = Sale.decorators[name].getPrice(price);
//   }
//   return price;
// };
//
// var sale = new Sale(100);
// sale.decorate('fedtax');
// sale.decorate('quebec');
// sale.getPrice();

// 函数式的装饰者, 用行为委托， 就这么简单 跟策略模式没什么区别
const Sale = {
  setUp(price) {
    this.tax = [];
    this.price = price;
    this.taxTable = {
      a: 0.02,
      b: 0.03,
      c: 0.04,
    };
  },

  addTax(taxName) {
    this.tax.push(taxName);
    return this;
  },

  calculate() {
    // 没有税，1个税
    if (this.tax.length === 0) {
      return this.price;
    } else if (this.tax.length === 1) {
      const key = this.tax[0];
      return this.price + this.price * this.taxTable[key];
    }
    // 多个税
    const rate = this.tax.reduce((prev, cur) => this.taxTable[prev] + this.taxTable[cur]);
    return this.price + this.price * rate;
  },
};

const sale = Object.create(Sale);
sale.setUp(1000);
sale.addTax('b').addTax('a');
console.log(sale.calculate());
