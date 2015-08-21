/**
 * Created by feifei on 2015/8/21.
 */
Array.prototype.sum = function () {
    return this.reduce(function (previous, current, index, array) {
        /*
         * @previous 上次迭代的返回值
         * @current  当前项
         * @index    项的索引
         * @array    数组对象
         * 注意：     迭代从第二项开始，所以第一次previous是array[0],current是array[1]
         * @index    当前索引
         * array     数组对象
         * */
        return previous + current;
    }); // 这里是执行reduce方法，返回结果,不是返回一个函数
        // reduce第二个参数，归并的起始值没有用到。
};

var values = [1,2,3,4,5];
console.log(values.sum());
