import eventList from './eventList'

let _triggerEventObj = {} // 定义的可触发的事件
let _event = {} // 你所监听的所有事件
let lastEvent = null // 设置的上个事件

function Trigger () {}

// 添加自定义触发事件，采取了重名覆盖
Trigger.addTriggerEvent = function (eventObj) {
  for (let e in eventObj) {
    _triggerEventObj[e] = eventObj[e]
  }
}

/** 设置触发器的鼠标状态和y坐标 */
Trigger.prototype.set = function (state, y, height) {
  // 回位的是重置上一个事件
  if (state === 0 && (y === 0 || y === height)) {
    lastEvent = null
  }

  // 每次设置状态的时候，循环监听的事件
  for (let e in _event) {
    // 当某个事件达到判断条件后，并且事件和上个触发的事件不相等，则执行事件的回调函数
    if (typeof _triggerEventObj[e] === 'function' && _triggerEventObj[e](state, y, height) && lastEvent !== _event[e]) {
      lastEvent = _event[e] // 设置上一个事件
      return _event[e]() // 达到条件后直接返回，执行达到条件的触发器的回调函数
    }
  }
}

// 监听相应的触发事件函数
Trigger.prototype.on = function (eventName, fn) {
  _event[eventName] = fn
}

// 添加事件
Trigger.addTriggerEvent(eventList)

export default Trigger
