<template>
    <div class="rating">
        <font-awesome-icon v-for="i in size" :key="i" class="startrating" ref="i" @click="clickStar(i)" :icon="['fas', 'star']" />
    </div>
</template>

<script>
export default {
    name: 'star-rating',
    props: 
    { size: {
        type: Number,
        default: 5
        } 
    },
    data() {
        return {
            last_element: -1,
            lst: null
        }
    },
    methods: {
        clickStar(starvalue){
            starvalue -= 2

            // Removes stars
            if(this.lst[starvalue]){
                for(const [key, value] in  Object.entries(this.$refs['i']).reverse()){
                    this.$refs['i'][key].classList.remove('orange')
                    this.lst[key] = false
                }
                for(const [key, value] in  Object.entries(this.$refs['i']).reverse()){
                    if(starvalue < key){
                        this.$refs['i'][key].classList.add('orange')
                        this.lst[key] = true
                    }
                }
            } else {
                for(const [key, value] in  Object.entries(this.$refs['i']).reverse()){
                    if(starvalue < key){
                        this.$refs['i'][key].classList.add('orange')
                        this.lst[key] = true
                    }
                }
            }
            for(const [key, value] in  Object.entries(this.$refs['i']).reverse()){
                if(this.lst[starvalue]){
                    this.$refs['i'][key].classList.remove('orange')
                    this.lst[key] = false
                }
            }
          const realvalue = this.size - starvalue - 1
          this.$emit("updateRating", realvalue)
        },
    },
    mounted(){
        this.lst = []
        for (let index = 0; index < this.size; index++) {
            this.lst.push(false)
        }
    }
}
</script>
<style>
.rating {
    display: flex;
    flex-direction: row-reverse;
}

.startrating:hover {
  color: orange;
}

.rating .startrating:hover ~ .startrating {
  color: orange;
}

.orange {
    color: orange;
}
</style>