<template>
  <div id="comment-container">
    <h1 class="comment-title">Comments ({{ comments.length }})</h1>
    <Comment v-for="(comment, index) in comments" :key="index" :reviewid="comment.review_id" :username="comment.username" :userpic="comment.userpic" :timestamp="comment.date_time" :value="comment.content" :votes="comment.votes" :showLikeButtons="true" />
    <InputComment :postid="postid" v-if="this.$store.getters.isUserConnected && this.$store.getters.getUserProfile.is_renter" />
  </div>
</template>

<script>
import InputComment from './AddCommentInput.vue'
import Comment from './Comment.vue'

export default {
  name: 'comment-container',
  props: ['comments', 'postid'],
  components: { Comment, InputComment }
}
</script>
<style scope>
#comment-container {
    min-height: 260px;
    width: 100%;
    border: 1px solid silver;
    border-top: none;
}

.add-comment {
  padding: 25px;
  width: 100%;
}

.add-comment-title {
  font-family: Nunito;
  font-weight: 800;
}

.comment-area {
  margin-top: 10px;
  padding: 10px;
  min-height: 150px;
  width: 100%;
  outline: none;
  border: 1px solid silver;
  resize: none;
}

.comment-send {
  font-family: Nunito;
  font-size: 18px;
  color: white;
  margin-top: 10px;
  height: 30px;
  width: 150px;
  border: none;
  border-radius: 25px;
  outline: none;
  background-color: #42275a;
  cursor: pointer;
}

.comment-send:hover {
  background-color: #734b6d;
}

.button-container {
  display: flex;
  justify-content: center;
}

.comment-title {
  text-align: center;
  font-family: nunito;
  font-weight: 700;
  border-bottom: 1px solid silver;
  padding: 10px;
}
</style>