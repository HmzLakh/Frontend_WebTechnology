<template>
  <div id="homepage">
    <Navbar :isConnected="isConnected"></Navbar>
    <p>This is the homepage!</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'homepage',
  components: {Navbar},
  data () {
    return {
      isConnected: false
    }
  }
}
</script>

<style>
#homepage {
  width: 100%;
}
</style>