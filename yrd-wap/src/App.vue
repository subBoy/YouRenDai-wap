<template>
  <div id="app">
    <router-view></router-view>
    <a href="www.yourendai.com" id="routerBtn" v-show="false"></a>
  </div>
</template>

<script>
import axios from 'axios'

axios.defaults.withCredentials = true

export default {
  created () {
    this.$router.beforeEach((to, from, next) => {
      axios.get('/static/inter.json', {}).then((res) => {
        if (res.status === 200) {
          next()
        } else {
          return
        }
      }).catch((err) => {
        if (err) {
          document.getElementById('routerBtn').click()
        }
      })
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
