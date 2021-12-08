<template>
  <div id="homepage">
    <Navbar></Navbar>
    <MapViewer></MapViewer>
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
import MapViewer from '../components/MapViewer.vue'

export default {
  name: 'homepage',
  components: {Navbar, ArticleContainer, ArticleFilter, MapViewer}
}
</script>

<style>
#homepage {
  width: 100%;
}

.container-layout {
  display: flex;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}
</style>