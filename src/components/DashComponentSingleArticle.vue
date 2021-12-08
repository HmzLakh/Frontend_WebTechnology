<template>
    <div id="singlepost">
        <EditPost :open="openOverlay" @close="close"></EditPost>
        <div class="single-container">
            <img src="../assets/images/show.jpg" alt="">
            <div class="single-overlay">
                <p class="single-overlay-txt">{{ title }}</p>
            </div>
        </div>
        <div class="single-buttons">
            <div @click="openOverlay = true" class="single-edit-btn">
                <font-awesome-icon :icon="['fas', 'edit']" />
            </div>
            <div class="single-delete-btn">
                <font-awesome-icon :icon="['fas', 'trash']" />
            </div>
        </div>
    </div>
</template>
<script>
import EditPost from './overlay/EditPost.vue'

export default {
  name: 'dashcomponentsinglepost',
  components: { EditPost },
  props: ['title'],
  data () {
      return {
          openOverlay: false
      }
  },
  methods: {
      close(){
          this.openOverlay = false;
      }
  }
}
</script>

<style>
#singlepost {
    width: 250px;
    height: 200px;
    background-color: purple;
    border-radius: 15px;
    overflow: hidden;
}

.single-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 75%;
    width: 100%;
    background-color: green;
    overflow: hidden;
}

.single-container img {
    width: 100%;
}

.single-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.single-overlay-txt {
    font-family: Nunito;
    font-weight: 600;
    color: white;
}

.single-buttons {
    display: flex;
    height: 25%;
    width: 100%;
}

.single-buttons * {
    height: 100%;
    width: 50%;
}

.single-edit-btn,
.single-delete-btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.single-edit-btn {
    background: #00aaa0;
}

.single-edit-btn:hover {
    background-color:  #8ed2c9;
}

.single-delete-btn {
    background-color: rgb(195,55,100);
}

.single-delete-btn:hover {
    background-color: #eb3349;
}
</style>