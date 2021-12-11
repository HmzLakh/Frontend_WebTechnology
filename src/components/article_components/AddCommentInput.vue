<template>
    <div id="add-comment">
        <SuccessBox message="Thanks for your rating!" :open="openSuccessOverlay" @close="closeOverlay"/>
        <div class="topside">
            <h2 class="add-comment-title">Add a rating</h2>
            <StarRating @updateRating="updateRating" />
        </div>
        <textarea class="comment-area" v-model="comment_input" maxlength="255"></textarea>
        <div class="button-container">
            <button class="comment-send" @click="openSuccessOverlay = true">Send</button>
        </div>
    </div>
</template>

<script>
import StarRating from './StarRatingComponent.vue'
import SuccessBox from '../overlay/SuccesBox.vue'
import Comment from './Comment.vue'

export default {
    name: 'comment-input',
    props: ['comments'],
    components: { Comment, StarRating, SuccessBox },
    data(){
        return {
            rating: 0,
            comment_input: '',
            openSuccessOverlay: false
        }
    },
    methods: {
        updateRating(value){
            this.rating = value
        },
        closeOverlay(){
            this.openSuccessOverlay = false
            this.resetComponent()
        },
        resetComponent(){
            this.rating = 0
            this.comment_input = ''
        }
    }
}
</script>
<style>
#add-comment {
  padding: 25px;
  width: 100%;
}

.add-comment-title {
  font-family: Nunito;
  font-weight: 800;
  margin-right: 25px;
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

.topside {
    display: flex;
}
</style>