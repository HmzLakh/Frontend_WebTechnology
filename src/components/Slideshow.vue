<template>
  <div id="slideshow">
      <button @click="slideLeft" class="previous-img"><font-awesome-icon :icon="['fas', 'chevron-left']" /></button>
      <Slide v-for="(value, index) in imglinks" :key="index" :img="value" v-if="index == currentIdx"></Slide>
      <button @click="slideRight"  class="next-img"><font-awesome-icon :icon="['fas', 'chevron-right']" /></button>
  </div>
</template>

<script>
import Slide from './Slide.vue'

export default {
    name: 'slideshow',
    components: { Slide },
    props: ['imglinks'],
    data () {
        return {
            currentIdx: 0
        }
    },
    methods: {
        slideRight(){
            this.currentIdx = (this.currentIdx+1) % this.imglinks.length
        },
        slideLeft(){
            this.currentIdx--
            if(this.currentIdx<0){
                this.currentIdx = this.imglinks.length-1
            }
        }
    }
}
</script>
<style>
#slideshow {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 300px;
    width: 100%;
    background-color: #cccccc;
}

.previous-img, .next-img {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 35px;
    background: rgba(0, 0, 0, 0.2);
    transition: .25s all;
}

.previous-img {
    left: 0;
    outline: none;
    border: none;
}

.next-img {
    right: 0;
    outline: none;
    border: none;
}

.previous-img:hover, .next-img:hover {
    background: rgba(0, 0, 0, 0.5);
    transition: .25s all;
}
</style>