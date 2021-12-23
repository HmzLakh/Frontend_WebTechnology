<template>
  <div id="articlepage">
      <Navbar />
      <ReserveOverlay :sports="sports" :fields="fields" :open="openPopup" @close="closeReserveOverlay" />
      <div class="article-container">
        <Slideshow :imglinks="images" />
          <div class="article-description">
              <h1 class="article-name">{{ article_name }}</h1>
              <h5>{{ article_address }}, {{ article_phonenumber }}</h5>
              <p class="articlepage-txt">{{ article_description }}</p>
              <button class="reserve-button" @click="openPopup = true">Show fields</button>
          </div>
          <CommentSection :postid="article_id" :comments="reviews" />
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
      article_id: -1,
      article_name: 'Loading please wait...',
      article_address: '',
      article_phonenumber: '',
      article_description: '',
      reviews: [],
      images: [],
      sports: [],
      fields: []
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
  watch:{
    getPost: function(data){
      if(data.success !== undefined){ // This means we have an error with our request :(, so we redirect user to homepage
        this.$router.push({name: 'root'})
      } else {
        this.images = data.images
        this.sports = data.sports
        this.fields = data.fields
        this.reviews = data.reviews
        this.article_name = data.name
        this.article_address = data.address
        this.article_phonenumber = data.phonenumber
        this.article_description = data.description
        this.article_id = data.post_id
      }
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