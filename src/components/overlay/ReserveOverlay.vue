<template>
    <div>
        <SweetModal title="Reserve" ref="reserveOverlay" @close="overlayClosed">
        <div id="reserveOverlay">
            <p>Select field</p>
            <p>Select type of sport</p>
            <p>Select Date when you plan to come back</p>
            <p>HOur when you want to come</p>
            <div class="confirm-deletebtn">
                <button @click="OpenConfirmation">Confirm</button>
            </div>
        </div>
    </SweetModal>
    <SweetModal icon="success" ref="nestedChild" @close="closeNestedEvent">
	    <p class="reserveOverlay-reserve-msg">Reserved</p>
    </SweetModal>
    </div>
</template>
<script>
import { SweetModal } from 'sweet-modal-vue'

export default {
    name: 'reserveOverlay',
    props: {
        open: {
            required: true
        }
    },
    components: { SweetModal },
    watch: { 
        open: function(newVal, oldVal) {
            if(newVal == true) {
                this.$refs.reserveOverlay.open()
            }
        }
    },
    methods: { 
        overlayClosed(){
            this.$emit('close')
        },
        OpenConfirmation(){
            this.$refs.nestedChild.open()
        },
        closeNestedEvent(){
            this.$refs.reserveOverlay.close()
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

.confirm-deletebtn button {
    border-radius: 30px;
    border: none;
    margin: 30px 0;
    outline: none;
    height: 70px;
    width: min(500px, 40%);
    background-color: #55efc4;
    color:white;
    font-size: 18px;
    font-family: Nunito;
}

.confirm-deletebtn button:hover {
    cursor: pointer;
    background-color: #00b894;
}

.reserveOverlay-reserve-msg {
    font-size: 18px;
    font-family: Nunito;
    color: green;
}
</style>