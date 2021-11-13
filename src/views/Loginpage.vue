<template>
  <div id="loginpage">
    <LoginContainer></LoginContainer>
    <a class="goback" @click="$router.go(-1)">
      <font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']" /> Go back
    </a>
  </div>
</template>

<script>
import store from '../store'
import LoginContainer from '../components/LoginContainer.vue'

export default {
  name: 'loginpage',
  components: {LoginContainer},
  beforeRouteEnter: function(to, from, next) {
    if(!store.getters.isUserConnected){
      next()
    } else {
      next(false)
    }
  },
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

.goback {
  margin: 15px 0;
  font-family: Nunito;
  color: white;
  transition: 0.25s;
}

.goback:hover {
  color: #ffdde1;
  font-size: 20px;
  transition: 0.25s;
  cursor: pointer;
}

</style>