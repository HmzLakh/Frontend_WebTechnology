<template>
  <div id="homepage">
    <Navbar />
    <MapViewer />
    <div class="container-layout">
      <ArticleFilter />
      <ArticleContainer class="home-article-container" />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ArticleFilter from '../components/Homepage_components/ArticleFilter.vue'
import ArticleContainer from '../components/Homepage_components/ArticleContainer.vue'
import MapViewer from '../components/Homepage_components/MapViewer.vue'

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

@media screen and (max-width: 800px) {
  .container-layout {
    flex-direction: column;
  }

  .home-article-container {
    margin-bottom: 30px;
  }
}
</style>