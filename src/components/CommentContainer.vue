<template>
  <div id="comment-container">
    <h1 class="comment-title">Comments (3)</h1>
    <Comment v-for="(comment, index) in comments" :key="index" :username="comment.username" :userpic="comment.userpic" :timestamp="comment.timestamp" :value="comment.value" :votes="comment.votes"  :isDisliked="comment.dislikedbyuser" :isLiked="comment.likedbyuser"></Comment>
    <div class="add-comment">
      <h2 class="add-comment-title">Add a comment</h2>
      <textarea class="comment-area" maxlength="255"></textarea>
      <div class="button-container">
        <button class="comment-send">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../components/Comment.vue'

export default {
  name: 'comment-container',
  props: ['comments'],
  components: { Comment }
}
</script>
<style>
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