<template>
    <Overlay  animate="zoom-in" :opened="opened" :visible="visible" @closed="this.close()">
        <div id="overlay-editpost">
            <p>Images</p>
            <p>Zalen</p>
            <p>Sport type tags</p>
        </div>
    </Overlay>
</template>
<script>
import { Overlay } from 'vuejs-overlay';

export default {
    name: 'overlay-editpost',
    components: { Overlay },
    props: ['opened', 'visible'],
    methods: {
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style>
#overlay-editpost {
    height: 400px;
    width: 100%;
}
</style>