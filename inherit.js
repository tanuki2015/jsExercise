/**
 * Created by feifei on 2015/8/23.
 */
// 最简单的是对象的继承,使用Object.create()
// create()第一个参数是需设置为新对象的prototype的对象，第二个是属性描述对象。

//var book = {
//    title: "The Principles of Object-oriented JavaScript"
//};
//
//// is the same as
//
//var book =  Object.create(Object.prototype,{
//    title: {
//        configurable: true,
//        enumerable: true,
//        value: "The Principles of Object-oriented JavaScript",
//        writable: true
//    }
//});

// 常见的继承

var person1 = {
    name: "Nicholas",
    sayName: function(){
        console.log(this.name);
    }
};

var person2 = Object.create(person1,{
    name: {
        configurable: true,
        enumerable: true,
        value: "Greg",
        writable: true
    }
});

console.log(person1.hasOwnProperty("sayName")); // true
console.log(person1.isPrototypeOf(person2)); // true
console.log(person2.hasOwnProperty("sayName")); // false



