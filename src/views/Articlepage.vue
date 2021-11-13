<template>
  <div id="articlepage">
      <Navbar></Navbar>
      <div class="article-container">
        <Slideshow></Slideshow>
          <div class="article-description">
              <h1 class="article-name">{{ getPost.title }}</h1>
              <h5>{{ getPost.address }}</h5>
              <p>{{ getPost.description }}</p>
              <button class="reserve-button">
                <ReservePopup v-if="openPopup" class="popup"></ReservePopup>
                Reserve
              </button>
          </div>
          <CommentSection :comments="getPost.comments"></CommentSection>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import Slideshow from '../components/Slideshow.vue'
import ReservePopup from '../components/ReservePopup.vue'
import CommentSection from '../components/CommentContainer.vue'

export default {
  name: 'articlepage',
  components: { Navbar, Slideshow, CommentSection, ReservePopup, Footer},
  data () {
    return {
      isConnected: false,
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
</style>