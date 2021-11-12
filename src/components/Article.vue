<template>
  <div id="article-el">
      <div class="image-card">
          <img src="../assets/Images/exampleimg.jpg" />
      </div>
      <div class="article-desc">
          <h1 class="article-title">VUB Building Sp...</h1>
          <h6 class="article-creator">By VUB</h6>
          <div class="review">
              <font-awesome-icon v-for="index in 5" :key="index" class="star-on" :icon="['fas', 'star']" />
              <!-- <font-awesome-icon v-for="index in 2" :key="index" :icon="['fas', 'star']" />-->
              <p class="review-amount">(7)</p>
          </div>
          <router-link :to="{ name: 'article', params: {id:123}}"><div class="view-button"><font-awesome-icon class="view-button-image" :icon="['fas', 'eye']" /></div></router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'article-el',
  data() {
      return {
          id: 10
      }
  }
}
</script>
<style>
#article-el {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 260px;
    width: 250px;
    border: 1px solid silver;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.image-card {
    height: 60%;
    border-bottom: 1px solid silver;
    overflow: hidden;
}

.image-card img {
    height: auto;
    width: 100%;
}

.article-desc {
    height: 40%;
    width: 100%;
}

.article-title {
    font-family: Nunito;
    font-weight: 400;
    font-size: 26px;
    padding: 10px 10px 0 10px;
}

.article-creator {
    font-family: Nunito;
    font-weight: 400;
    font-size: 10px;
    padding-left: 10px;
    color: gray;
}

.star-on {
    color: orange;
}

.review {
    position: absolute;
    bottom: 15px;
    left: 10px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
}
.review-amount {
    font-family: Nunito;
    font-weight: 400;
    font-size: 10px;
    color: gray;
}

.view-button {
    position: absolute;
    right: 10px;
    bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 75px;
    background-color: #ff512f;
    border-radius: 25px;
    cursor: pointer;
}

.view-button:hover {
    background: #dd2476;
}

.view-button-image {
    color: white;
}
</style>