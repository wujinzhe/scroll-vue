/**
 * 触发器可触发的自定义事件列表
 */

export default {
  /** 触发下拉加载 */
  downPullLoad: (state, pos) => state === 0 & pos === 50,
  /** 变到下拉加载状态 */
  toDownPullLoad: (state, pos) => state === 0 & pos > 50,
  /** 已经回位 */
  downPullReset: (state, pos) => state === 0 & pos === 0,
  /** 手指一直在触摸屏幕 拉动距离大于0 小于3倍下拉距离 */
  touchDownPull: (state, pos) => state === 1 & pos < 150 & pos > 0,
  /** 手指一直在触摸屏幕 拉动距离超过3倍下拉距离 */
  touchDownPullOut: (state, pos) => state === 1 & pos >= 150,

  /** 上拉动距离大于0 小于3倍下拉距离 */
  touchUpPull: (state, pos, height) => state === 1 & pos > height - 200 && pos < height,
  /** 上拉动距离超过3倍上拉距离 */
  touchUpPullOut: (state, pos, height) => state === 1 & pos < height - 200,
  /** 变到上拉加载状态 */
  toUpPullLoad: (state, pos, height) => state === 0 & pos < height - 50,
  /** 触发上拉加载 */
  upPullLoad: (state, pos, height) => state === 0 & pos === height - 50,
  /** 已经回位 */
  upPullReset: (state, pos, height) => state === 0 & pos === height
}

// if (this.touchState === 1) {
//   if (pos.y < this.down.refreshHeight * 3 && pos.y >= 0) {
//     this.downText = this.down.pullText
//     this.currentState = -1 // 处于下拉状态中
//   } else if (pos.y >= this.down.refreshHeight * 3) {
//     this.downText = '松开加载数据'
//     this.currentState = -1 // 处于下拉状态中
//   } else if (pos.y <= this.upHeight + this.up.refreshHeight && pos.y >= this.limitUpHeight) {
//     this.currentState = -2 // 处于上拉状态中
//     this.upText = this.up.pullText
//   } else if (pos.y < this.limitUpHeight) {
//     this.currentState = -2 // 处于上拉状态中
//     this.upText = '松开加载更多'
//   }
// } else {
//   // 表示手指或者鼠标已经离开屏幕
//   if (pos.y === 0) {
//     this.currentState = 0 // 复位
//   } else if (pos.y === this.down.refreshHeight) {
//     this.currentState = 1 // 请求数据中
//   } else if (pos.y > this.down.refreshHeight) {
//     this.downText = this.down.loadingText // 显示loading文字
//     this.currentState = -1 // 处于下拉状态中
//   } else if (pos.y === this.upHeight) {
//     this.upText = this.up.loadingText // 显示loading文字
//     this.currentState = 1 // 请求数据中
//   } else if (pos.y < this.upHeight) {
//     this.upText = this.up.loadingText // 显示loading文字
//     this.currentState = -2 // 处于上拉状态中
//     this.iscroll.scrollTo(0, this.upHeight, 300) // 停在加载位置
//     setTimeout(() => {
//       this.pullUp()
//     }, 300)
//   }
// }
