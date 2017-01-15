/*  样式已经写好，只需要创建一个div遮罩层，一个button打开它
*   再创建一个div来login，一个button关闭遮罩
*   先完成一个单例的创建，其他后面再加
*/
$(function() {
  const createMask = (function() {
    let instance; // 单例保存在闭包中

    return function() {
      // 有表示已经创建过，返回闭包中的单例
      if (instance) {
        return instance;
      }
      // 第一次的话，则执行创建工作
      instance = document.createElement('div');
      instance.id = 'mask';
      document.body.appendChild(instance);
      return instance;
    };
  })();

  const mask = createMask();
  const mask2 = createMask();
  console.log(mask === mask2); // true
  setTimeout(() => { mask.style.display = 'block'; }, 2000); // 看看效果
});
