/**
 * dom 节点的 几个常用属性和方法
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
 */

// 下面可以写个dom库做练习
function getElementChildren(element) {
  const length = element.childNodes.length;
  if (length === 0) {
    return null;
  }

  const nodes = [];
  for (let i = 0; i < length; i++) {
    if (element.childNodes[i].nodeType === 1) {
      nodes.push(element.childNodes[i]);
    }
  }
  return nodes;
}
const ul = document.querySelector('ul');
const lis = getElementChildren(ul);
const li = lis[0];
console.log(getElementChildren(li));
// console.log(lis);
