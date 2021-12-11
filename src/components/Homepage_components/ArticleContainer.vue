<template>
  <div id="article-container">
    <div class="article-search">
      <input type="search" >
    </div>
    <div class="article-inner" v-if="this.getPosts.length > 0">
      <Article  v-for="p in getPosts" :key="p.id" :id="p.id" :name="p.name" :author="p.author" :tags="p.tags" :review="p.review"></Article>
    </div>
    <div class="article-empty-inner" v-else>
      <p class="article-empty-txt">Its a bit lonely here...<br/>You can be the first to change this!</p>
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
  width: 100%;
}

.article-inner {
  display: flex;
  flex-wrap: wrap;
}

.article-inner > * {
  margin: 10px;
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
  background: url(../../assets/Images/search.png) 10px center no-repeat;
  background-size: 10%;
}

.article-empty-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 70px);
}

.article-empty-txt {
  font-family: Nunito;
  font-weight: 500;
}
</style>