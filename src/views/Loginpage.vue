<template>
  <div id="loginpage">
    <LoginContainer></LoginContainer>
    <a @click="$router.go(-1)">Go back</a>
  </div>
</template>

<script>
import LoginContainer from '../components/LoginContainer.vue'

export default {
  name: 'loginpage',
  components: {LoginContainer}
}
</script>

<style>

#loginpage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: rgb(195,55,100);
  background: linear-gradient(348deg, rgba(195,55,100,1) 0%, rgba(29,38,113,1) 100%);
}

</style>