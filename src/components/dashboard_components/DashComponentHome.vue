<template>
    <div id="homecomponent">
        <div class="post-container home-container-form">
            <p class="home-title">Total posts</p>
            <p class="home-value">10</p>
        </div>
        <div class="like-container home-container-form">
            <p class="home-title">Total likes</p>
            <p class="home-value">10</p>
        </div>
        <div class="dislike-container home-container-form">
            <p class="home-title">Total dislikes</p>
            <p class="home-value">10</p>
        </div>
        <div class="review-container">
            <p class="home-title">Last reviews</p>
            <Comment  v-for="index in 3" :key="index" :username="452" :userpic="123" :timestamp="453254" :value="54354" :votes="254245"  :isDisliked="45254" :isLiked="2542"></Comment>
        </div>
    </div>
</template>

<script>
import Comment from '../article_components/Comment.vue'

export default {
  name: 'dashcomponenthome',
  components: { Comment }
}
</script>

<style>
#homecomponent {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f7f6f9;
    padding-bottom: 50px;
}

#homecomponent {
    display: grid;
    grid-gap: 5%;
    grid-template-columns: auto 1fr 1fr 1fr auto;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: row;
    grid-template-areas:
        " . post-container like-container dislike-container ."
        " . review-container review-container review-container .";
}

.review-container {
    padding: 25px;
    width: 100%;
    grid-area: review-container;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.home-title {
    font-family: Nunito;
    font-size: 26px;
}

.home-value {
    font-family: Nunito;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
}

.home-container-form {
    padding: 20px;
    height: 150px;
    grid-area: post-container;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.post-container {
    grid-area: post-container;
}

.like-container {
    grid-area: like-container;
}

.dislike-container {
    grid-area: dislike-container;
}

</style>