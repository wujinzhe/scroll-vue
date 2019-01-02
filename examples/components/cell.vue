<template>
  <div class="cell" @click="cellClick">
    <div class="cell-content">
      <div class="title">
        <h2>标题</h2>
        <p>文字描述</p>
      </div>
      <div class="cell__text">
        {{ text }}
      </div>
      <van-button type="danger" size="mini" @click.native="click">按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: ['text'],
  methods: {
    click (e) {
      e.stopPropagation()
      e.preventDefault() // 阻止默认行为
      this.$toast(`你点击了第 ${this.text} 行の按钮`)
    },
    cellClick () {
      this.$toast(`你点击了第 ${this.text} 行`)
    }
  }
}
</script>

<style scoped>
  .icon {
    width: 10px;
    height: 10px;
    background-color: #f5f5f5;
    float: left;
  }
  .cell {
    color: red;
    padding-left: 20px;
  }

  .title {
    font-size: 12px;
    font-weight: 400;
    float: left;
    text-align: left;
  }

  .title h2 {
    color: #282828;
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    margin: 0;
    margin-bottom: 4px;
  }

  .title p {
    margin: 0;
    color: #666666;
  }

  .cell__text {
    flex-shrink: 1;
  }

  .cell-content {
    border-bottom: 1px solid #f5f5f5;
    padding: 13px 20px 13px 0;
    text-align: center;
    font-size: 23px;
    font-weight: 900;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
