<template>
  <div>
    <scroll
      ref="scroll"
      :data="cellData"
      :listenScrollEnd="true"
      :pullUpLoad="pullUpLoad"
      @pullingUp="onPullingUp">
      <div class="list">
        <cell v-for="(item, key) in cellData" :key="key" :text="item.n"></cell>
      </div>
    </scroll>
  </div>
</template>

<script>
import { scroll } from '../../src/index.js'
import cell from '../components/cell.vue'

export default {
  name: 'Example',
  components: {
    scroll,
    cell
  },
  data () {
    return {
      cellData: [],
      pullUpLoad: {
        threshold: 10,
        txt: { more: '', noMore: '暂无更多数据' }
      }
    }
  },
  created () {
    this.addData()
  },
  methods: {
    search () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.addData()
          resolve()
        }, 1400)
      })
    },
    addData () {
      let l = this.cellData.length
      for (let i = l; i < l + 6; i++) {
        console.log(i)
        this.cellData.push({n: i + 1})
      }
    },
    onPullingUp () {
      this.search()
    }
  }
}
</script>

<style scoped>
</style>
