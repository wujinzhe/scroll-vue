<template>
  <div ref="iscroll" id="iscroll">
    <div ref="iscrollContent" class="iscroll-content" @touchstart="touchStart" @mousedown="touchStart">
      <div class="down" :style="downStyle">
        <span class="pull__text">
          <img v-if="downText === down.loadingText" class="loadImg" src="../assets/loading.svg"/>
          {{ downText }}
        </span>
      </div>
      <div ref="listWrap">
        <slot name="list"></slot>
      </div>
      <div class="up" :style="upStyle">
        <span class="pull__text">
          <img v-if="upText === up.loadingText" class="loadImg" src="../assets/loading.svg"/>
          {{ upText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import IScroll from 'better-scroll'
import Trigger from '../utils/Trigger'
import Cache from '../utils/Cache'

const downHeight = 50
const upHeight = 50
var lastY = 0 // 防止上一个高度与下一个高度整数部分相同

export default {
  name: 'scroll',
  components: {
    scroll
  },
  data () {
    return {
      trigger: new Trigger(), // 触发器实例
      iscroll: null, // scroll 的实例
      currentState: 0, // -1 处于下拉中 -2 处于上拉中  1 处于请求数据中  0 已复位
      touchState: 0, // 触摸状态   0 初始状态（离开）  1触碰状态
      text: '',
      text1: '',
      prevStatus: 0,
      cacheData: null, // 需要缓存的数据
      isPullUp: false // 是否已经触发上拉刷新,
    }
  },
  props: {
    downPullLoad: {
      type: Function,
      default: () => {}
    },
    upPullLoad: {
      type: Function,
      default: () => {}
    },
    down: {
      type: [Object, Boolean],
      default: () => {
        return {
          refreshHeight: 50,
          pullText: '上拉加载更多', // 上拉时候的提示文字
          loadingText: '加载数据中', // 加载的提示文字
          successText: '刷新成功' // 上拉成功的提示文字
        }
      }
    },
    up: {
      type: [Object, Boolean],
      default: () => {
        return {
          refreshHeight: 50,
          pullText: '上拉加载更多', // 上拉时候的提示文字
          loadingText: '加载数据中', // 加载的提示文字
          successText: '加载成功', // 上拉成功的提示文字
          noDataText: '-没有更多数据了-'
        }
      }
    }
  },
  watch: {
    downText (val) {
      if (val === this.down.successText) {
        console.log('---加载成功---')
        setTimeout(() => {
          this.iscroll.scrollTo(0, 0, 300) // 复原位置
        }, 200)
      }
    }
  },
  computed: {
    downText: {
      get () {
        return this.text
      },
      set (val) {
        this.text = val
      }
    },
    upText: {
      get () {
        return this.text1
      },
      set (val) {
        this.text1 = val
      }
    },
    downStyle () {
      return {
        height: `${downHeight}px`,
        lineHeight: `${downHeight}px`,
        top: `-${downHeight}px`
      }
    },
    upStyle () {
      return {
        height: `${upHeight}px`,
        lineHeight: `${upHeight}px`
      }
    },
    /** iscroll高度 */
    iscrollHeight () {
      return this.$refs.iscroll.clientHeight
    },
    /** 列表的高度 */
    listHeight () {
      return this.$refs.listWrap.clientHeight
    },
    /** 上拉高度 */
    upHeight () {
      return this.iscrollHeight - this.$refs.listWrap.clientHeight
    },
    /** 下拉加载事件，带缓存 */
    downPullCacheLoad () {
      return Cache(this.downPullLoad)
    },
    /** 上拉加载事件，带缓存 */
    upPullCacheLoad () {
      return Cache(this.upPullLoad)
    }
  },
  mounted () {
    this.downText = this.down.pullText
    this.upText = this.up.pullText
    setTimeout(() => this.initScroll(), 0)

    this.initList()
  },
  created () {
    // this.downPullEvent
    // this.downPullLoad
  },
  methods: {
    /** 初始化scroll组件 */
    initScroll () {
      // iscroll 初始化
      this.iscroll = new IScroll('#iscroll', {
        probeType: 3, // 必须指定为3，否则拖动太快就监控不到
        startY: 0
      })

      // 监听滚动事件
      this.iscroll.on('scroll', pos => {
        ~~pos.y !== lastY &&
          this.trigger.set(this.touchState, ~~pos.y, this.iscrollHeight - this.$refs.listWrap.clientHeight)
        lastY = ~~pos.y
      })

      // 手指离开屏幕
      this.iscroll.on('touchEnd', (pos) => {
        this.touchState = 0 // 改变触摸状态
      })

      /* -----下拉的监听事件------ */
      // 监听加载状态 loading...
      this.trigger.on('downPullLoad', () => {
        console.log('----加载中----')
        this.downText = this.down.loadingText // 变成加载文字
        this.iscroll.stop() // 停止滚动动画
        this.downPullCacheLoad()
        this.downPullCacheLoad.finish(resp => {
          // 判断手指是否是处于触摸状态
          if (this.touchState === 0) {
            this.downText = this.down.successText // 变成成功文字
            this.downPullCacheLoad.clear() // 清空重置缓存
            this.$emit('downPullLoadFinished', resp)
          }
        })
      })

      // 监听是否处于按住下拉状态
      this.trigger.on('touchDownPull', () => {
        console.log('----下拉状态----')
        this.downText = this.down.pullText // 变成按住下拉文字
      })

      // 监听是否处于按住下拉状态 但是超出了范围
      this.trigger.on('touchDownPullOut', () => {
        console.log('----下拉状态（超出范围）----')
        this.downText = '松开加载更多' // 变成按住松开文字
      })

      // 监听回到加载的状态
      this.trigger.on('toDownPullLoad', () => {
        console.log('----回到加载状态----')
        this.downText = this.down.loadingText // 变成加载文字
        this.iscroll.scrollTo(0, downHeight, 300)
      })

      // 下拉刷新回到初始状态
      this.trigger.on('downPullReset', () => {
        console.log('----回到原始状态----')
        this.downText = this.down.pullText // 变回下拉加载文字
      })

      /* ------上拉的监听事件------- */
      // 上拉状态
      this.trigger.on('touchUpPull', () => {
        console.log('----上拉状态----')
        this.upText = this.up.pullText // 变回上拉加载文字
      })

      // 上拉状态（超过范围了）
      this.trigger.on('touchUpPullOut', () => {
        console.log('----上拉状态（超过范围了）----')
        this.upText = '松开加载更多' // 变回松开加载文字
      })

      // 变到上拉加载状态
      this.trigger.on('toUpPullLoad', () => {
        console.log('----变到上拉加载状态----')
        this.upText = this.up.loadingText // 变成上拉加载文字
        this.iscroll.scrollTo(0, this.iscrollHeight - this.$refs.listWrap.clientHeight - 50, 300)
      })

      // 触发上拉加载中
      this.trigger.on('upPullLoad', () => {
        console.log('----上拉加载中----')
        this.upText = this.up.loadingText // 变成上拉加载文字
        this.iscroll.stop()
        this.upPullCacheLoad()
        this.upPullCacheLoad.finish(resp => {
          // 判断手指是否是处于触摸状态
          if (this.touchState === 0) {
            if (resp.length === 0) {
              this.upText = this.up.noDataText
            } else {
              this.upText = this.up.successText // 变成成功文字
            }
            this.upPullCacheLoad.clear() // 清空重置缓存
            this.$emit('upPullLoadFinished', resp)
            this.$nextTick(() => {
              this.iscroll.refresh()
              this.initList()
            })
          }
        })
      })
    },
    initList () {
      if (this.$refs.listWrap.clientHeight < this.iscrollHeight) {
        this.upText = this.up.loadingText
        this.upPullLoad().then(resp => {
          if (resp.length > 0) {
            this.$emit('upPullLoadFinished', resp)
            this.$nextTick(() => {
              this.iscroll.refresh()
              this.initList()
            })
          }
        })
      }
      return true
    },
    /** 鼠标按下或者手指按下 */
    touchStart () {
      this.touchState = 1 // 触摸状态
    }
  }
}
</script>

<style scoped>

  .down {
    font-size: 14px;
    color: #999;
    text-align: center;
    position: absolute;
    width: 100%;
  }
  .up {
    font-size: 14px;
    color: #999;
    text-align: center;
    position: absolute;
    width: 100%;
  }

  .loadImg {
    width: 30px;
    display: inline-block;
    vertical-align: middle;
  }

  #iscroll {
    height: 100%;
    background-color: #fafafa;
    overflow: hidden;
    position: relative;
    -webkit-overflow-scrolling : touch;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 100%;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
    -ms-touch-action: none;
    touch-action: none;
  }
</style>
