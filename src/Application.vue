<template>
  <div id="app">
    <Navbar :isConnected="isConnected"></Navbar>
    <!-- <MapViewer></MapViewer> -->
    <div id="page-content">
      <!-- <Article-container></Article-container> -->
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import MapViewer from './components/MapViewer.vue'
import ArticleContainer from './components/ArticleContainer.vue'

export default {
  name: 'app',
  components: {Navbar, MapViewer, ArticleContainer},
  data () {
    return {
      isConnected: false
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  width: 100vw;
  background: rgb(221,214,243);
  background: linear-gradient(336deg, rgba(221,214,243,1) 0%, rgba(250,172,168,1) 100%);
}

#page-content {
  width: 100%;
  background-color: red;
}

</style>