<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    this.$store.dispatch('checkUserIsAlreadyConnected')
    }
}
</script>

<style>
#app {
  width: 100%;
}
</style>