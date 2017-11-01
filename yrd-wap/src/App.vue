<template>
  <div id="app" @touchmove.prevent>
    <router-view></router-view>
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
          location.href = 'www.yourendai.com'
        }
      })
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
