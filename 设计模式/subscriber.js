// 学着写一个简单的订阅发布模式

const publisher = {
  subscribers: {
    any: [],
  },

  subscribe(type, fn) {
    type = type || 'any';
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },

  unsubscribe(type, fn) {
    for (let i = 0; i < this.subscribers[type].length; i++) {
      if (this.subscribers[type][i] === fn) {
        this.subscribers[type].splice(i, 1);
        break;
      }
    }
  },

  publish(type, ...args) {
    for (let i = 0; i < this.subscribers[type].length; i++) {
      this.subscribers[type][i].apply(this, args);
    }
  },
};

const fn1 = (msg) => { console.log(`第一条消息 and ${msg}`); };
const fn2 = () => { console.log('第2条消息'); };
const fn3 = () => { console.log('第3条消息'); };


publisher.subscribe('公众号', fn1);
publisher.subscribe('我的号', fn2);
publisher.subscribe('公众号', console.log);


// publisher.publish('公众号', fn1);

setTimeout(function(){publisher.publish('公众号', '可以穿参数哦！');}, 2000);
setTimeout(function(){publisher.publish('我的号');}, 4000);
setTimeout(function(){publisher.unsubscribe('公众号', fn1);}, 5000);

setTimeout(function(){publisher.publish('公众号', '我是console.log');}, 6000);
