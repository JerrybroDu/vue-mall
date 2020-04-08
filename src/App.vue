<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage'
export default {
  name: 'app',
  components: {

  },
  data () {
    return {
      res: {}
    }
  },
  mounted () {
    // 判断cookie中是否存在userId，有则已经登录，无则未登录
    if (this.$cookie.get('userId')) {
      // 已经登录过，则当刷新页面时，再次获取用户数据
      this.getUser()
      this.getCartCount()
    }
    /**
     * Mock设置第一种方式: 本地加载请求静态json文件的形式
     * this.axios.get('/public/mock/user/login.json').then((res) => {
     *  this.res = res
     * })
     */
    /**
     * Mock设置第二种方式: 利用插件'mockjs' 和 本地集成mock/api.js,来实现数据mock
     * this.axios.get('/user/login').then((res) => {
     *  this.res = res
     * })
     */
  },
  methods: {
    getUser () {
      // 这里的res = {} 是当res为空/undefined时，设置默认值为一个空对象
      this.axios.get('/user').then((res = {}) => {
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount () {
      // 这里的res = 0 是当res为空时，设置默认值0
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style lang="scss">
  @import './assets/scss/reset.scss';
  @import './assets/scss/config.scss';
  @import './assets/scss/button.scss';
</style>
