<template>
  <div id="dashboardpage">
      <Navbar></Navbar>
      <p>Dashboard</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'dashboardpage',
  components: { Navbar },
  mounted() {
    if(!this.$store.getters.isUserConnected){
      this.$router.replace('/')
    }
  }
}
</script>

<style>

#registerpage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
</style>