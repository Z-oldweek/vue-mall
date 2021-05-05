import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})

//默认bus是空的，但可以给bus赋值一个vue实例作为事件总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
