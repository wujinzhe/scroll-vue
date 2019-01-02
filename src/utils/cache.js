/** 缓存数据请求的封装 */
function Cache (http) {
  let isOnceTime = true // 是否第一次进入
  let data = null // 缓存数据
  let _http = null // ajax请求，后面赋值为promise类型
  let finish = null

  function _cache () {
    setTimeout(() => {
      // 判断是否是第一次进入
      if (isOnceTime) {
        isOnceTime = false
        _http = http().then(resp => {
          data = resp
          return resp
        }).then(finish)
        return _http
      } else if (isOnceTime === false && data === null) {
        // 如果请求还未返回，又不是第一次进入，则直接返回第一次的promise
        return _http
      } else {
        // 已经得到请求结果（缓存数据），直接返回缓存数据
        return Promise.resolve(data).then(finish)
      }
    })
  }

  _cache.finish = function (fn) {
    finish = fn
  }

  /** 清空缓存数据和重置为第一次进入 */
  _cache.clear = function () {
    isOnceTime = true
    data = null
    finish = null
  }

  return _cache
}

export default Cache
