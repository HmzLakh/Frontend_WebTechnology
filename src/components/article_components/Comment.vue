<template>
  <div id="comment">
      <div class="comment-profile">
          <img class="profilepic" src="../../assets/Images/login.png">
      </div>
      <div class="right-side">
        <div class="comment-information">
            <p class="username">{{ username }}
                <span class="comment-star-container">
                    <span class="comment-rating-on"><font-awesome-icon v-for="i in rating" :key="i" class="startrating" :icon="['fas', 'star']" /></span>
                    <span class="comment-rating-off"><font-awesome-icon v-for="i in (5-rating)" :key="i" class="startrating" :icon="['fas', 'star']" /></span>
                </span>
            </p>
            <h6>{{ timestamp }}</h6>
        </div>
        <div class="comment">
            <p>{{ value }}</p>
        </div>
      </div>
      <div v-if="showLikeButtons" class="votes">
          <div class="votes-amount">{{ votes == null ? 0 : votes }}</div>
          <div class="votes-buttons" v-if="this.$store.getters.isUserConnected && this.$store.getters.getUserProfile.is_renter">
              <div @click="addThumbsUp" class="up-button"><font-awesome-icon :icon="['fas', 'thumbs-up']" /></div>
              <div @click="addThumbsDown" class="down-button"><font-awesome-icon :icon="['fas', 'thumbs-down']" /></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['postid', 'username', 'userpic', 'timestamp', 'value', 'votes', 'showLikeButtons', 'reviewid', 'rating'],
    name: 'comment',
    methods: {
        addThumbsUp(){
            const info = {
                postid: this.postid,
                review_id: this.reviewid,
                opinion: 1
            }
            this.$store.dispatch("sendOpinion", info)
        },
        addThumbsDown(){
            const info = {
                postid: this.postid,
                review_id: this.reviewid,
                opinion: -1
            }
            this.$store.dispatch("sendOpinion", info)
        }
    }
}
</script>
<style>
#comment {
    display: flex;
    width: 100%;
    border-bottom: 1px solid silver;
}

.comment-profile {
    width: 60px;
}

.profilepic {
    width: 100%;
}

.username {
    color:green;
    font-weight: bold;
}

.right-side {
    width: 100%;
    padding: 0 10px;
    border-right: 1px solid silver;
}

.votes {
    display: flex;
}

.votes-amount {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.votes-buttons {
    display: flex;
    flex-direction: column;
    width: 30px;
}

.votes-buttons > * {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.up-button {
    color: #6dd5ed;
}

.up-button:hover {
    color: #2193b0;
}

.down-button {
    color: #d66d75;
}

.down-button:hover {
    color: #dd2476;
}

.comment-rating-off {
    font-size: 12px;
    color: black;
}

.comment-rating-on {
    font-size: 12px;
    color: orange;
}

.comment-star-container {
    font-size: 0;
}

</style>