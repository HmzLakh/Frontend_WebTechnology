<template>
  <div id="loginpage">
    <Navbar :isConnected="isConnected"></Navbar>
    <p>This is the login page my friend!!!!!!!!!!!!</p>
  </div>
</template>

<script>
export default {
  name: 'loginpage'
}
</script>

<style>

#loginpage {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: red;
}

</style>