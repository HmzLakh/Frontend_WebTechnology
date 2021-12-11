<template>
    <SweetModal icon="success" ref="successbox" @close="overlayClosed">
        <div id="confirmationbox">
            <p>{{ message }}</p>
        </div>
    </SweetModal> 
</template>
<script>
import { SweetModal } from 'sweet-modal-vue'

export default {
    name: 'successbox',
    props: {
        open: {
            required: true
        },
        message: {
            type: String,
            required: true,
        }
    },
    components: { SweetModal },
    watch: { 
        open: function(newVal) {
            if(newVal == true) {
                this.$refs.successbox.open()
            }
        }
    },
    methods: { 
        overlayClosed(){
            this.$emit('close')
        }
    }
}
</script>