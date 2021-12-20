<template>
    <div>
        <SweetModal title="Sports" ref="reserveOverlay" @close="overlayClosed">
        <div id="reserveOverlay">
            <table class="reserve-table">
                    <tr class="reserve-tr">
                        <td class="reserve-td reserve-td-title"><p class="reserve-table-txt">See fields</p></td>
                        <td class="reserve-td">
                            <select v-model="fieldChoice" class="reserve-selectedtag-input"> <!-- get list from server for here -->
                                <option value="" disabled selected>Select field</option>
                                <option v-for="(f, i) in fields" :key="i">{{ f.name }} ({{ f.sports_names }})</option>
                            </select>
                        </td>
                    </tr>
                    <tr class="reserve-tr">
                        <td class="reserve-td reserve-td-title"><p class="reserve-table-txt">Sports available here</p></td>
                        <td class="reserve-td">
                            <p class="reserve-td-sports" v-for="(s, i) in sports" :key="i">{{ s }}</p>
                        </td>
                    </tr>
            </table>
            <div class="reserve-errormsg" v-if="errorForm">
                <p>{{ errorFormMessage }}</p>
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
        },
        sports: {
            required: true
        },
        fields: {
            required: true
        }
    },
    data(){
        return {
            sportChoice: '',
            fieldChoice: '',
            reserveDuration: 0,
            date: null,
            time: null,
            errorForm: false,
            errorFormMessage: ''
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
        validForm(){
            // Check formvalidation!
            //this.$refs.nestedChild.open()
            this.overlayClosed()
        },
        closeNestedEvent(){
            this.$refs.reserveOverlay.close()
        }
    }
}
</script>

<style>
#reserveOverlay {
    height: 240px;
}

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

.reserve-table {
    width: 100%;
}

.reserve-tr {
    display: flex;
    flex-direction: column;
}

.reserve-td {
    width: 100%;
}

.reserve-table-txt {
    text-align: start;
    font-family: Nunito;
    font-size: 20px;
}

.reserve-td-title {
    padding: 5px;
}

.reserve-title {
    padding-left: 15px;
    height: 30px;
    width: 100%;
    outline: none;
}

.reserve-selectedtag-input {
    margin: 10px 0;
    width: 100%;
    padding-left: 15px;
    height: 31px;
    outline: none;
}

.reserve-input {
    padding-left: 15px;
    height: 30px;
    width: 100%;
    outline: none;
}

.reserve-input-date {
    padding-left: 15px;
    height: 30px;
    width: 50%;
    outline: none;
}

.reserve-input-time {
    padding-left: 15px;
    height: 31px;
    width: 49%;
    outline: none;
}

@media screen and (max-width: 415px) {
    .reserve-input-date {
        margin-bottom: 10px;
        width: 100%;
    }

    .reserve-input-time {
        width: 100%;
    }
}

.reserve-errormsg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
}

.reserve-errormsg p {
    font-size: 12px;
    font-family: Nunito;
    color: red;
    font-style: italic;
}

.reserve-td-sports{
    font-family: Nunito;
    font-style: italic;
}
</style>