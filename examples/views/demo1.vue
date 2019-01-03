<template>
  <div class="scroll-wrap" id="scroll-wrap">
    <scroll
      :downPullLoad="downPullLoad"
      :downHeight="50"
      @downPullLoadFinished="downPullLoadFinished"
      :upHeight="50"
      :upPullLoad="upPullLoad"
      @upPullLoadFinished="upPullLoadFinished">
      <div class="list" slot="list">
        <cell v-for="(item, key) in cellData" :key="key" :text="item"></cell>
      </div>
    </scroll>
  </div>
</template>

<script>
import { scroll } from '../../src/index.js'
import cell from '../components/cell.vue'
const ajaxDownPull = () => new Promise((resolve, reject) => {
  let list = []
  let promiseList = []
  for (let i = 0; i < 13; i++) {
    promiseList.push(new Promise((resolve, reject) => {
      setTimeout(() => {
        list.push(Math.round(Math.random() * 100))
        resolve()
      }, 600)
    }))
  }
  Promise.all(promiseList).then(() => {
    resolve(list)
  })
})

export default {
  name: 'Example',
  components: {
    scroll,
    cell
  },
  data () {
    return {
      cellData: [],
      // 下拉刷新请求的方法，必须返回promise
      downPullLoad: () => {
        return ajaxDownPull()
      },
      // 上拉加载更多请求的方法，必须返回promise
      upPullLoad: () => {
        return ajaxDownPull()
      }
    }
  },
  mounted () {
    let bodyHeight = document.body.clientHeight
    let headHeight = document.querySelectorAll('.van-nav-bar')[0].clientHeight
    document.querySelector('#scroll-wrap').style.height = `${bodyHeight - headHeight}px`
  },
  methods: {
    click () {
      this.$toast.success('成功文案')
    },
    /** 下拉刷新完成事件 */
    downPullLoadFinished (data) {
      console.log('我是下拉刷新的数据', data)
      this.cellData = data
      this.$toast('刷新成功')
    },
    /** 上拉加载完成事件 */
    upPullLoadFinished (data) {
      console.log('我是上拉加载的数据', data)
      this.cellData.push(...data)
    }
  }
}
</script>

<style scoped>
  .scroll-wrap {
    height: calc(100vh - 46px);
  }

  .list {
    background-color: #ffffff;
  }
</style>
