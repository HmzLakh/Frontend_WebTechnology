<template>
  <div id="article-viewer">
    <!-- <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>-->
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
#article-viewer {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 350px);
  background-color: green;
}

#article-viewer > * {
  margin: 10px;
}
</style>