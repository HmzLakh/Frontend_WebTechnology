<template>
  <div id="registerpage">
    <RegisterChoice v-if="!choosen"></RegisterChoice>
    <RegisterContainer v-else></RegisterContainer>
    <a class="goback" @click="$router.go(-1)">
        <font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']" /> Go back
    </a>
  </div>
</template>

<script>
import RegisterChoice from '../components/RegisterChoice.vue'
import RegisterContainer from '../components/RegisterContainer.vue'

export default {
  name: 'registerpage',
  components: {RegisterChoice, RegisterContainer},
  data() {
      return {
        unwatch: () => null,
        choosen: false
      }
  },
  mounted() {
    if(this.$store.getters.isUserConnected){
      this.$router.replace('/')
    }
    this.unwatch = this.$store.watch(() => this.$store.getters.isUserConnected, (newValue) => {
      if(newValue){
        this.$router.replace('/')
      }
    })
  },
  beforeDestroy() {
    this.unwatch()
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