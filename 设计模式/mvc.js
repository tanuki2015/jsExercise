// 学习这篇文章把代码改成自己看起来舒服的样子。《30行代码实现Javascript中的MVC》未完...
// http://web.jobbole.com/85108/?utm_source=blog.jobbole.com&utm_medium=relatedPosts

// 目标： 有一个值，在模型中被改动后自动更新视图。view由html文档充当，这里先实现model

// 定义model
class Model {
  constructor(value = '') {
    this.value = value;
    this.listeners = [];
  }

  set(value) {
    function runCallback() {
      // 不喜欢嵌套太多，所以把执行调用的方法先写出来，再放到setTimeout中去
      this.listeners.forEach(listener => listener(value));
    }
    // 异步调用，所以用setTimeout，当然也可以直接调用
    setTimeout(runCallback.bind(this));
  }

  watch(listener) {
    this.listeners.push(listener);
  }
}

// 逻辑代码
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // do something。。。
    ((function start() {
      const model = new Model();
      const div1 = document.querySelector('#div1');

      function showDiv1(value) {
        div1.innerHTML = value;
      }
      model.watch(showDiv1);

      model.set('hello, this is div1');
    })());
  }
};
