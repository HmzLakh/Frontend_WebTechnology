<template>
  <div id="homepage">
    <Navbar :isConnected="isConnected"></Navbar>
    <div class="container-layout page-container">
      <ArticleFilter></ArticleFilter>
      <ArticleContainer></ArticleContainer>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ArticleFilter from '../components/ArticleFilter.vue'
import ArticleContainer from '../components/ArticleContainer.vue'

export default {
  name: 'homepage',
  components: {Navbar, ArticleContainer, ArticleFilter},
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

.container-layout {
  display: flex;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  background-color: yellow;
}
</style>