<template>
  <div class="undefind-404-wrapper">
    <div class="grounp">
      <img src="./500.jpg" width="100%">
      <router-link tag="div" class="index-btn" to="/recommend"></router-link>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .undefind-404-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 100
    overflow: hidden
    .grounp
      position: absolute
      left: 0
      top: 0
      width: 100%
      .index-btn
        position: absolute
        top: 59.35%
        left: 50%
        width: 40%
        height: 6%
        transform: translate3d(-50%, -50%, 0)
</style>
