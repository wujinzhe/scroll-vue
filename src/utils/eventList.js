/**
 * 触发器可触发的自定义事件列表
 */

export default (downHeight, upHeight) => {
  return {
  /** 触发下拉加载 */
    downPullLoad: (state, pos) => state === 0 & pos === downHeight,
    /** 变到下拉加载状态 */
    toDownPullLoad: (state, pos) => state === 0 & pos > downHeight,
    /** 已经回位 */
    downPullReset: (state, pos) => state === 0 & pos === 0,
    /** 手指一直在触摸屏幕 拉动距离大于0 小于3倍下拉距离 */
    touchDownPull: (state, pos) => state === 1 & pos < downHeight * 3 & pos > 0,
    /** 手指一直在触摸屏幕 拉动距离超过3倍下拉距离 */
    touchDownPullOut: (state, pos) => state === 1 & pos >= downHeight * 3,

    /** 上拉动距离大于0 小于3倍下拉距离 */
    touchUpPull: (state, pos, height) => state === 1 & pos > height - upHeight * 4 && pos < height,
    /** 上拉动距离超过3倍上拉距离 */
    touchUpPullOut: (state, pos, height) => state === 1 & pos < height - upHeight * 4,
    /** 变到上拉加载状态 */
    toUpPullLoad: (state, pos, height) => state === 0 & pos < height - upHeight,
    /** 触发上拉加载 */
    upPullLoad: (state, pos, height) => state === 0 & pos === height - upHeight,
    /** 已经回位 */
    upPullReset: (state, pos, height) => state === 0 & pos === height
  }
}
