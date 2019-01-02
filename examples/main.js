// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

Vue.use(Vant)
// import scroll from '../src/index'
Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err)
}

// Vue.use(scroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
