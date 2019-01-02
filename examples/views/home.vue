<template>
  <div class="home">
    <div class="demo-content">
      <div class="demo-block">
        <h2>基础用法</h2>
        <van-cell-group>
          <van-cell title="全屏滚动" to="/demo1" is-link />
          <van-cell title="单元格" is-link />
          <van-cell title="单元格" is-link />
          <van-cell title="单元格" is-link />
        </van-cell-group>
      </div>
      <div class="demo-block">
        <h2>基础用法</h2>
        <van-cell-group>
          <van-cell title="单元格" is-link />
          <van-cell title="单元格" is-link />
          <van-cell title="单元格" is-link />
          <van-cell title="单元格" is-link />
        </van-cell-group>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Example',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    /* overflow: hidden; */
  }

  .demo-block h2 {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    color: rgba(69,90,100,.6);
    padding: 40px 15px 15px;
  }

  .demo-content {
    /* height: calc(100vh - 46px);
    overflow: auto;
    -webkit-overflow-scrolling: touch; */
  }
</style>
