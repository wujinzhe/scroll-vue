<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    title: {
      get () {
        return this.$root.title
      }
    }
  },
  created () {
    this.$root.title = 'scroll-vue 菜单'
  },
  methods: {
    onClickLeft () {
      history.back()
    }
  }
}
</script>

<style>
  body, html {
    width: 100%;
    height: 100%;
  }
</style>
