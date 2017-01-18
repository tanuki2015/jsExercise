// 用ramda改进一下

$(function(){
  // 做一下初始化工作，找到img，提取src，换成站位图，站位，才能计算位置
  let imgs = document.querySelectorAll('img');
  // for(let i = 0, len = imgs.length; i < len; i++ ){
  //   imgs[i].realSrc = imgs[i].src;
  //   imgs[i].src = 'http://placehold.it/350x150';
  //   imgs[i].dataset.loaded = 'false'; // 特性值只能是字符串
  // }

  R.forEach((img) => {
    img.realSrc = img.src;
    img.src = 'http://placehold.it/350x150';
    img.dataset.loaded = 'false'; // 特性值只能是字符串
  }, imgs);

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
    // for (let i = 0, len = elements.length; i < len; i++) {
    //   elements[i].dataset.height = getElementTop(elements[i]) + elements[i].offsetHeight;
    // }

    R.forEach((img) => {
      img.dataset.height = getElementTop(img) + img.offsetHeight;
    }, imgs);
  }


  // const imgTop = getElementTop(img) + img.offsetHeight; // 偏移加上盒子本身的高度

// 监听scroll事件的handle
  function handleScroll() {
    imgsTop(imgs);
    // 这个地方兼容写法，否则对chrome不起作用
    const viewPort = document.documentElement.scrollTop || document.body.scrollTop;
    const scroll = viewPort + document.documentElement.offsetHeight;

    // for (let i = 0, len = imgs.length; i < len; i++) {
    //   // dom2读写自定义特性的方法dataset代表【data-】
    //   let isLoad = imgs[i].dataset.loaded; // 记住这是字符串
    //
    //   if (imgs[i].dataset.height < scroll && isLoad === 'false') {
    //     const tempImg = document.createElement('img');
    //     tempImg.src = imgs[i].realSrc;
    //     tempImg.onload = function() {
    //       imgs[i].src = tempImg.src;
    //       // 添加标志位，避免重复加载，要用setAttribute
    //       // img.setAttribute('data-loaded', true);
    //       imgs[i].dataset.loaded = 'true';
    //     };
    //   }
    // }

    R.forEach((img) => {
      // dom2读写自定义特性的方法dataset代表【data-】
      let isLoad = img.dataset.loaded; // 记住这是字符串

      if (img.dataset.height < scroll && isLoad === 'false') {
        const tempImg = document.createElement('img');
        tempImg.src = img.realSrc;
        tempImg.onload = function() {
          img.src = tempImg.src;
          // 添加标志位，避免重复加载，要用setAttribute
          // img.setAttribute('data-loaded', true);
          img.dataset.loaded = 'true';
        };
      }
    }, imgs);
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
