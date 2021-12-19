<template>
    <SweetModal icon="warning" title="Confirmation" ref="confirmationbox">
        <div id="confirmationbox">
            <p class="confirmationbox-txt">{{ text }}</p>
            <div class="confirm-btns">
                <button class="confirm-btn-yes" @click="yesEvent">Yes</button>
                <button class="confirm-btn-no" @click="overlayClosed">No</button>
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
            type: Boolean,
            required: true
        },
        text: {
            type: String,
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
            this.$refs.confirmationbox.close()
            this.$emit('close')
        },
        yesEvent(){
            this.$refs.confirmationbox.close()
            this.$emit('yes')
        }
    }
}
</script>

<style>
.confirm-btns {
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.confirm-btns > * {
    margin: 0 15px;
}

.confirm-btns button {
    margin-top: 15px;
    height: 50px;
    width: 30%;
    border-radius: 25px;
    border: none;
    outline: none;
    color:white;
    background: #95a5a6;
}

.confirm-btn-yes:hover {
    background-color: #16a085;
}

.confirm-btn-no:hover {
    background-color: #c0392b;
}

.confirmationbox-txt {
    font-family: Nunito;
}
</style>