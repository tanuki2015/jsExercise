# dom 节点的 几个常用属性和方法
domNode = {
  nodeName: '', // 大写标签名
  nodeType: 1~11, // element 1，attribute 2, text 3, document 9, fragment 11,
  childNodes: [], // 子节点类数组
  parentNode: aNode, // 父节点一个
  previousSibling: pNode, // 上一个兄弟节点
  nextSibling: nNode, // 下一个弟弟节点
  firstChild: fNode, // 第一个子节点
  lastChild: lNode, // 最后一个子节点

 createElement(tagName) { return tagNode}, // 例： 传入‘div’， 返回一个div节点
 createAttribute(attributeName) {return attributeNode}, // 传入id， 返回这个属性节点
 createTextNode(text) {return textNode},
 createFragment() {return fragmentNode}, // 无参数，返回一个文档碎片

 appendChild(node) {return theNode}, // 在node最后一个子节点插入，返回插入的节点
 insertBefore(newNode, oldNode) {return newNode} // 由parentNode调用， 返回插入的节点
 replaceChild(newNode, oldNode) {return newNode}, // 成功则返回newNode，失败返回Null
 cloneNode(boolean) {return clonedNode}, // 传参false为浅拷贝，true为深拷贝
 removeChild(node) {return deletedNode}, // 成功返回节点， 失败返回Null

 hasChildNodes(node) {return boolean}; // 有子节点则返回true， 否则false
}

## 复习dom，ie中的盒子模型

1. 内容区的大小，包括padding,是这两个：clientWidth, clientHeight。
2. 包括边框的大小，是这两个：offsetWidth, offsetHeight.
3. 有溢出的内容时，scrollWidth, scrollHeight.
4. 相对于父元素的偏移量： offsetTop, offsetLeft.
5. 有滚动内容，被隐藏部分的偏移量： scrollTop, scrollLeft.

图片延迟加载案例知识点：
1. 取得img的绝对偏移量（height），这是一个定值。
  * img.offsetTop + img.offsetHeight // 需要写一个函数，递归计算所有offsetParent的值后相加
  ```
  // 源码见高程p322
  function getElementTop(element) {
    let current = element.offsetParent;
    let actualTop = element.offsetTop;
    while (current) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }
  ```
2. 监听window的scroll事件，不断计算html元素的scrollTop和offsetHeight（视口）的值。
  * addEventListener('scroll', fn)
  * document.documentElement.scrollTop // document.documentElement指html文档
  * document.documentElement.clientHeight // 文档的视口 高度
3. img的绝对偏移量小于窗口滚动条滚出的值时，表示img出现在视口中，可以显示图片了。

```
const div = document.querySelector('div');
const divTop = getElementTop(div) + div.offsetHeight; // 偏移加上盒子本身的高度

window.addEventListener('scroll', function() {
  // 这个地方兼容写法，否则对chrome不起作用
  let viewPort = document.documentElement.scrollTop || document.body.scrollTop;
  if (divTop < viewPort) {
    div.style.display = 'block';
  }
});
```
