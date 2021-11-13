<template>
  <div id="articlepage">
      <Navbar></Navbar>
      <div class="article-container">
        <Slideshow></Slideshow>
          <div class="article-description">
              <h1 class="article-name">Article title</h1>
              <h5>Pleinlaan 2, 1050 Elsene</h5>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <button class="reserve-button">
                <ReservePopup v-if="openPopup" class="popup"></ReservePopup>
                Reserve
              </button>
          </div>
          <CommentSection></CommentSection>
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