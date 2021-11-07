<template>
  <div id="article-container">
    <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>
  </div>
</template>

<script>
import Article from './Article.vue'

export default {
  name: 'article-container',
  components: { Article }
}
</script>

<style>
#article-container {
  display: flex;
  flex-wrap: wrap;
  background-color: green;
}

#article-container > * {
  margin: 10px;
}
</style>