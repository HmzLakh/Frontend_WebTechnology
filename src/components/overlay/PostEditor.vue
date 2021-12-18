<template>
    <div>
        <SweetModal :title="title" ref="overlay" @close="overlayClosed">
            <SweetModalTab title="Post" id="tab1">
                <div id="overlay-editpost">
                <table class="postedit-table">
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Title</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" type="text" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Location</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" type="text" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Thumbnail</p></td>
                        <td class="posteditor-td">
                            <UploadComponent></UploadComponent>
                        </td>
                    </tr>
                <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Images (max 5)</p></td>
                        <td class="posteditor-td">
                            <UploadImages
                                :max="5"
                                maxError='Max files exceed!'
                                uploadMsg="Upload images here"
                                clearAll="remove all"
                                @changed="handleImages"
                            />
                        </td>
                    </tr>
                </table>
                <div class="posteditor-btncontainer">
                    <button class="postedit-savebtn">Save</button>
                </div>
            </div>
            </SweetModalTab>
            <SweetModalTab title="Fields" id="tab2">
                <div class="posteditor-fieldstab">
                    <table class="postedit-table">
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Fields</p></td>
                            <td class="posteditor-td">
                                <input class="posteditor-addfield-input" v-model="newFieldName" type="text" maxlength="20" />
                                <button class="posteditor-addfield-cbtn" @click="addField">Add field</button>
                            </td>
                        </tr>
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Edit fields</p></td>
                            <td class="posteditor-td">
                                <table class="posteditor-innertable">
                                    <tr v-for="(item, idx) in fieldsArray" :key="idx" class="posteditor-innertable-tr">
                                        <td><p class="posteditor-innertable-txt">{{ item }}</p></td>
                                        <td><button class="posteditor-innertable-tr-editbtn"  @click="OpenFieldOverlay">Edit field</button></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </SweetModalTab>
        </SweetModal>
        <SweetModal ref="fieldOverlay" @close="closeFieldOverlay">
            <div class="fieldOverlay-container">
                <table class="postedit-table">
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Field name</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" placeholder="Name" type="text" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Recommended number of people</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" placeholder="Amount of people" type="number" min="0" max="300" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Price/hour</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" placeholder="Price" type="number" min="0" max="10000" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Sport tags</p></td>
                        <td class="posteditor-td">
                            <p class="posteditor-selectedtags-txt">Current selected tags: </p>
                            <div class="posteditor-showselectedtags">
                                <span class="posteditor-selectedtag" v-for="i in 10" :key="i">
                                    <p class="posteditor-selectedtag-closebtn"><font-awesome-icon :icon="['fas', 'times']" /></p>
                                    <p>Football {{i}}</p>
                                </span>
                            </div>
                            <select class="posteditor-selectedtag-input"> <!-- get list from server for here -->
                                <option value="">Select your tag</option>
                                <option value="dog">Football</option>
                                <option value="cat">basketball</option>
                                <option value="hamster">Hamster</option>
                                <option value="parrot">Parrot</option>
                                <option value="spider">Spider</option>
                                <option value="goldfish">Goldfish</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <p class="fieldOverlay-container-saveinfo">Informations are automatically saved...</p>
            </div>
        </SweetModal>
    </div>
</template>
<script>
import UploadImages from "vue-upload-drop-images"
import TagComponent from '../TagComponent.vue'
import UploadComponent from '../UploadFileComponent.vue'
import { VueTags } from 'vue-tags-component';
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
    name: 'overlay-editpost',
    components: { SweetModal, VueTags, TagComponent, UploadImages, UploadComponent, SweetModalTab },
    props: {open: {
                required: true
            }, 
            title: {
                type: String,
                required: true,
            },
            editor: {
                type: Boolean,
                required: false,
                default: true
            }
    },
    data() {
        return {
            fieldsArray: ["ok"],
            newFieldName: "test"
        }
    },
    watch: { 
        open: function(newVal, oldVal) { // watch it
            if(newVal == true) {
                this.$refs.overlay.open()
            }
        }
    },
    methods: {
        handleImages(files) {
            console.log(files)
        },
        overlayClosed(){
            this.$emit('close')
        },
        addField(){
            this.fieldsArray.push(this.newFieldName)
            this.newFieldName = ""
        },
        editField(field){
            console.log("Editing field: ", field);
        },
        OpenFieldOverlay(){
            this.$refs.fieldOverlay.open()
        },
        closeFieldOverlay(){
            console.log("Save field informations!!");
        }
    },
}
</script>

<style>
#overlay-editpost {
    min-height: 60vh;
    width: 100%;
}

.postedit-savebtn {
    margin: 30px 0px;
    height: 30px;
    width: 80%;
    border-radius: 25px;
    border: none;
    outline: none;
    background-color: #1abc9c;
    color: white
}

.postedit-savebtn:hover {
    background-color: #16a085;
}

.posteditor-btncontainer {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Responsive css */
.postedit-table {
    width: 100%;
}

.posteditor-tr {
    display: flex;
    flex-direction: column;
}

.posteditor-td {
    width: 100%;
}

.posteditor-table-txt {
    text-align: start;
    font-family: Nunito;
    font-size: 20px;
}

.posteditor-td-title {
    padding: 5px;
}

.posteditor-input {
    padding-left: 15px;
    height: 30px;
    width: 100%;
    outline: none;
}

.posteditor-addfield-input {
    margin: 5px 0;
    padding-left: 15px;
    height: 30px;
    width: 80%;
    outline: none;
}

.posteditor-addfield-cbtn {
    height: 30px;
    outline: none;
    width: 19%;
    background-color: #9b59b6;
    border: none;
    border-radius: 5px;
    color: white;
}

.posteditor-addfield-cbtn:hover {
    background-color: #8e44ad;
}

@media screen and (max-width: 415px) {
    .posteditor-addfield-input {
        width: 100%;
    }

    .posteditor-addfield-cbtn {
        margin: 10px 0;
        width: 100%;
    }
}

.posteditor-fieldstab {
    min-height: 200px;
}

.posteditor-fieldlist li {
    list-style-type: none;
}

.posteditor-innertable {
    width: 100%;
}

.posteditor-innertable-tr td{
    height: 30px;
    width: 50%;
}

.posteditor-innertable-tr-editbtn {
    background-color: #95a5a6;
    color: white;
    height: 100%;
    width: 100%;
    border: none;
    border-radius: 3px;
}

.posteditor-innertable-tr-editbtn:hover {
    background-color: #7f8c8d;
}

.posteditor-innertable-txt {
    font-family: Nunito;
    font-size: 13px;
}

.fieldOverlay-container {
    height: 100%;
    width: 100%;
}

.fieldOverlay-container-saveinfo {
    margin: 10px 0;
    text-align: start;
    font-style: italic;
    font-size: 12px;
    font-family: Nunito;
}

.posteditor-showselectedtags {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 20px 0;
}

.posteditor-showselectedtags > * {
    margin: 5px 5px;
}

.posteditor-selectedtag {
    display: flex;
    padding: 5px;
    background-color: #2d3436;
    color: white;
    font-family: Nunito;
    font-size: 14px;
    flex-basis: 5px;
	flex-shrink: 1;
	flex-grow: 1;
}

.posteditor-selectedtag-closebtn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff7675;
    margin: 0 5px;
}

.posteditor-selectedtag-input {
    margin: 10px 0;
    width: 100%;
    padding-left: 15px;
    height: 31px;
    outline: none;
}

.posteditor-selectedtags-txt {
    font-family: Nunito;
    font-size: 17px;
}
</style>