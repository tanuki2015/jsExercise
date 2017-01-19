// 原生尽量函数式的一点改进

$(function(){
  // 做一下初始化工作，找到img，提取src，换成站位图，站位，才能计算位置
  let imgs = document.querySelectorAll('img');

  // 用for of 替代 for in
  for (const img of imgs) {
    img.realSrc = img.src;
    img.src = 'http://placehold.it/350x150';
    img.dataset.loaded = 'false'; // 特性值只能是字符串
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

  // 把元素的高保存到dom属性上
  function imgsTop() {
    for (const img of imgs) {
      img.dataset.height = getElementTop(img) + img.offsetHeight;
    }
  }

  function handleScroll() {
    // 计算所有元素的高
    imgsTop();

    // 取视口高,注意兼容写法，否则对chrome不起作用
    const viewPort = document.documentElement.scrollTop || document.body.scrollTop;
    const scroll = viewPort + document.documentElement.offsetHeight;

    // 显示进入视口的图片
    for (const img of imgs) {
      // dom2读写自定义特性的方法dataset代表【data-】
      let isLoad = img.dataset.loaded; // 记住这是字符串

      if (img.dataset.height < scroll && isLoad === 'false') {
        const tempImg = new Image();  // 等于 document.createElement('img');
        tempImg.src = img.realSrc;

        tempImg.onload = () => {
          img.src = tempImg.src;
          img.dataset.loaded = 'true';
        };
      }
    }
  }

  // 节流函数
  function throttle(method, context) {
    clearTimeout(method.timeId);
    method.timeId = setTimeout(() => {
      method.call(context);
    }, 300)
  }

// 监听scroll事件的handle
  window.addEventListener('scroll', function(){
    throttle(handleScroll);
  });
});
