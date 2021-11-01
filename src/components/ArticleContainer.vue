<template>
  <div id="article-viewer">
    <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>
  </div>
</template>

<script>
import Article from './Article.vue'

export default {
  name: 'article-viewer',
  components: { Article },
  data () {}
}
</script>

<style>
@font-face {
    font-family: nunito;
    src: url('/src/assets/Fonts/Nunito-Light.woff');
}

#article-viewer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

#article-viewer > * {
  margin: 10px;
}
</style>