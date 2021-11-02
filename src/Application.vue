<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import MapViewer from './components/MapViewer.vue'
import ArticleFilter from './components/ArticleFilter.vue'
import ArticleContainer from './components/ArticleContainer.vue'

export default {
  name: 'app',
  components: {Navbar, MapViewer, ArticleFilter, ArticleContainer},
  data () {
    return {
      isConnected: false
    }
  }
}
</script>

<style>
#app {
  width: 100%;
}
</style>