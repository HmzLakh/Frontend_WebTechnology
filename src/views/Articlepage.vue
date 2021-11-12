<template>
  <div id="articlepage">
      <Navbar :isConnected="isConnected"></Navbar>
      <div class="container-layout">
          <div class="image-show">
              <div class="previous-img"><font-awesome-icon :icon="['fas', 'chevron-left']" /></div>
              <img src="../assets/Images/imageshow.jpg" />
              <div class="next-img"><font-awesome-icon :icon="['fas', 'chevron-right']" /></div>
          </div>
          <div class="article-desc">
              <h1>Article title</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          <CommentSection></CommentSection>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CommentSection from '../components/CommentContainer.vue'

export default {
  name: 'articlepage',
  components: { Navbar, CommentSection },
  data () {
    return {
      isConnected: false
    }
  }
}
</script>

<style>
#articlepage {
  width: 100%;
}

.container-layout {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.image-show {
    display: flex;
    justify-content: space-between;
    height: 300px;
    width: 100%;
    background: 
}

.previous-img, .next-img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 5%;
    background: rgba(0, 0, 0, 0.2);
    transition: .25s all;
}

.previous-img:hover, .next-img:hover {
    background: rgba(0, 0, 0, 0.5);
    transition: .25s all;
}

.article-desc {
    padding: 25px;
    height: 300px;
    width: 100%;
    border: 1px solid silver;
    border-top: none;
}
</style>