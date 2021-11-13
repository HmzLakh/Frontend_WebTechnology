<template>
  <div id="testpage">
      <p>Hello its me</p>
      <p>{{ getBody }}</p>
      <button @click="removeC">Get body</button>
  </div>
</template>

<script>
export default {
    name: 'testpage',
    data () {
        return {
            txt: 'ok'
        }
    },
    methods: {
        removeC() {
            this.$store.dispatch('checkUserIsAlreadyConnected')
        }
    },
    computed: {
        getBody(){
            return this.$store.state.logstate
        }
  }
}
</script>

<style>

#testpage {
    padding: 25px;
    width: 100vw;
    height: 100vh;
}

</style>