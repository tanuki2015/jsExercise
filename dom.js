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
// function getElementChildren(element) {
//   const length = element.childNodes.length;
//   if (length === 0) {
//     return null;
//   }
//
//   const nodes = [];
//   for (let i = 0; i < length; i++) {
//     if (element.childNodes[i].nodeType === 1) {
//       nodes.push(element.childNodes[i]);
//     }
//   }
//   return nodes;
// }
// const ul = document.querySelector('ul');
// const lis = getElementChildren(ul);
// const li = lis[0];
// console.log(getElementChildren(li));
// // console.log(lis);
//
// if (document.readyState === 'complete') {
//   console.log('readyState!!!');
// }

$(function(){
  // 做一下初始化工作，找到img，提取src，换成站位图，站位，才能计算位置
  let imgs = document.querySelectorAll('img');
  for(let i = 0, len = imgs.length; i < len; i++ ){
    imgs[i].realSrc = imgs[i].src;
    imgs[i].src = 'http://placehold.it/350x150';
    imgs[i].dataset.loaded = 'false'; // 特性值只能是字符串
  }

  // help函数，计算元素偏移量height
  function getElementTop(element) {
    let current = element.offsetParent;
    let actualTop = element.offsetTop;
    while (current) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }

  function imgsTop(elements) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].dataset.height = getElementTop(elements[i]) + elements[i].offsetHeight;
    }
  }


  // const imgTop = getElementTop(img) + img.offsetHeight; // 偏移加上盒子本身的高度

// 监听scroll事件的handle
  function handleScroll() {
    imgsTop(imgs);
    // 这个地方兼容写法，否则对chrome不起作用
    const viewPort = document.documentElement.scrollTop || document.body.scrollTop;
    const scroll = viewPort + document.documentElement.offsetHeight;

    for (let i = 0, len = imgs.length; i < len; i++) {
      // dom2读写自定义特性的方法dataset代表【data-】
      let isLoad = imgs[i].dataset.loaded; // 记住这是字符串

      if (imgs[i].dataset.height < scroll && isLoad === 'false') {
        const tempImg = document.createElement('img');
        tempImg.src = imgs[i].realSrc;
        tempImg.onload = function() {
          imgs[i].src = tempImg.src;
          // 添加标志位，避免重复加载，要用setAttribute
          // img.setAttribute('data-loaded', true);
          imgs[i].dataset.loaded = 'true';
        };
      }
    }
  }

// 函数节流(简化版本)
  // const throttle = (() => {
  //   let time;
  //   return () => {
  //     if (time) {
  //       clearTimeout(time);
  //     }
  //     time = setTimeout(handleScroll, 300);
  //   };
  // })();

  function throttle(method, context) {
    clearTimeout(method.timeId);
    method.timeId = setTimeout(() => {
      method.call(context);
    }, 300)
  }

  window.addEventListener('scroll', function(){
    throttle(handleScroll);
  });
});
