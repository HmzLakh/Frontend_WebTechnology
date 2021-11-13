<template>
  <div id="article-container">
    <div class="article-search">
      <input type="search" >
    </div>
    <div class="article-inner">
      <Article  v-for="p in getPosts" :key="p.id" :id="p.id" :name="p.name" :author="p.author" :tags="p.tags" :review="p.review"></Article>
    </div>
  </div>
</template>

<script>
import Article from './Article.vue'

export default {
  name: 'article-container',
  components: { Article },
  mounted(){
    this.$store.dispatch('getArticlesList')
  },
  computed: {
    getPosts(){
      return this.$store.getters.getArticles
    }
  }
}
</script>

<style>
#article-container {
  border: 1px solid silver;
}

.article-inner {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-auto-rows: minmax(100px, auto);
  padding: 10px;
}

.article-inner > * {
  margin: 5px;
}

.article-search {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid silver;
}

.article-search input[type="search"] {
  font-size: 18px;
  font-family: Nunito;
  height: 40px;
  width: 300px;
  border-radius: 25px;
  border: 1px solid silver;
  padding: 0 20px 0 42px;
  outline: none;
  background: url(../assets/Images/search.png) 10px center no-repeat;
  background-size: 10%;
}
</style>