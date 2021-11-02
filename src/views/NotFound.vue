<template>
  <div>
    <Navbar :isConnected="isConnected"></Navbar>
    <p>ERORR 4004: PAGE NOT FOUND IDIOT!</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'notfound',
  components: {Navbar},
}
</script>

<style>

</style>