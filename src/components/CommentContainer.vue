<template>
  <div id="comment-container">
      <Comment :msgContent="msg1" ></Comment>
      <Comment :msgContent="msg2"></Comment>
      <Comment :msgContent="msg3"></Comment>
  </div>
</template>

<script>
import Comment from '../components/Comment.vue'

export default {
  name: 'comment-container',
  components: { Comment },
  data() {
      return {
          msg1: "Message ceci toi",
          msg2: "Message toi cela",
          msg3: "Pourtoi toi la"
      }
  }
}
</script>
<style>
#comment-container {
    min-height: 260px;
    width: 100%;
    border: 1px solid silver;
    border-top: none;
}
</style>