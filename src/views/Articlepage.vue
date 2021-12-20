<template>
  <div id="articlepage">
      <Navbar />
      <ReserveOverlay :sports="getPost.sports" :fields="getPost.fields" :open="openPopup" @close="closeReserveOverlay" />
      <div class="article-container">
        <Slideshow :imglinks="getPost.images" />
          <div class="article-description">
              <h1 class="article-name">{{ getPost.name }}</h1>
              <h5>{{ getPost.address }}, {{getPost.phonenumber}}</h5>
              <p class="articlepage-txt">{{ getPost.description }}</p>
              <button class="reserve-button" @click="openPopup = true">Show fields</button>
          </div>
          <CommentSection :postid="getPost.post_id" :comments="getPost.reviews" />
      </div>
      <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import Slideshow from '../components/article_components/Slideshow.vue'
import ReserveOverlay from '../components/overlay/ReserveOverlay.vue'
import CommentSection from '../components/article_components/CommentContainer.vue'

export default {
  name: 'articlepage',
  components: { Navbar, Slideshow, CommentSection, ReserveOverlay, Footer},
  data () {
    return {
      openPopup: false,
    }
  },
  mounted(){
    const paramid = this.$route.params.id
    this.$store.dispatch("getArticle", paramid)
  },
  computed: {
    getPost(){
      return this.$store.getters.getCurrentArticle
    }
  },
  methods: {
    closeReserveOverlay(){
      this.openPopup = false;
    }
  }
}
</script>

<style>
#articlepage {
  width: 100%;
}

.article-container {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.article-name {
  font-family: Nunito;
  font-weight: 700;
}

.article-description {
  position: relative;
  padding: 25px;
  padding-bottom: 50px;
  min-height: 300px;
  width: 100%;
  border: 1px solid silver;
  border-top: none;
}

.reserve-button {
  position: absolute;
  right: 25px;
  bottom: 13px;
  width: 170px;
  height: 30px;
  font-size: 16px;
  outline: none;
  border: 1px solid silver;
  border-radius: 5px;
  cursor: pointer;
}

.popup {
  position: absolute;
  right: 0;
  bottom: 35px;
}

.articlepage-txt {
  font-family: Nunito;
}
</style>