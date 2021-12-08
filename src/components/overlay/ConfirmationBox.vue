<template>
    <SweetModal icon="warning" title="Confirmation" ref="confirmationbox" @close="overlayClosed">
        <div id="confirmationbox">
            <p>Are you sure you want to delete this?</p>
            <div class="confirm-deletebtn">
                <button>No</button>
                <button>Yes</button>
            </div>
        </div>
    </SweetModal> 
</template>
<script>
import { SweetModal } from 'sweet-modal-vue'

export default {
    name: 'confirmationbox',
    props: {
        open: {
            required: true
        }
    },
    components: { SweetModal },
    watch: { 
        open: function(newVal, oldVal) {
            if(newVal == true) {
                this.$refs.confirmationbox.open()
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

<style>
.confirm-deletebtn {
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.confirm-deletebtn > * {
    margin: 0 15px;
}

.confirm-deletebtn button {
    margin-top: 15px;
    height: 50px;
    width: 30%;
    border-radius: 25px;
    border: none;
    outline: none;
}

.confirm-deletebtn button:hover {
    background-color: red;
}
</style>