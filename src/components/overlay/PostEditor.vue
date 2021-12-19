<template>
    <div>
        <SweetModal :title="title" ref="overlay" @close="overlayClosed">
            <SweetModalTab title="Post" id="tab1">
                <div id="overlay-editpost">
                <table class="postedit-table">
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Title</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" v-model="post_title" placeholder="Title of post" type="text" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Location</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" v-model="post_location" placeholder="Location of building" type="text" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Thumbnail</p></td>
                        <td class="posteditor-td">
                            <UploadComponent @uploadthumbnail="uploadthumbnail"></UploadComponent>
                            <div v-if="thumbnail !== null" class="posteditor-imgpreview-thumbnail">
                                <img :src="'http://localhost:5555/api/image/'+thumbnail" alt="Thumbnail">
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="posteditor-btncontainer">
                    <button class="postedit-savebtn" @click="sendPost">Save</button>
                </div>
            </div>
            </SweetModalTab>
            <SweetModalTab title="Fields" id="tab2">
                <div class="posteditor-fieldstab">
                    <table class="postedit-table">
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Fields</p></td>
                            <td class="posteditor-td">
                                <input class="posteditor-addfield-input" v-model="newFieldName" type="text" placeholder="Field name" maxlength="20" />
                                <button class="posteditor-addfield-cbtn" @click="addField">Add field</button>
                            </td>
                        </tr>
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Edit fields</p></td>
                            <td class="posteditor-td">
                                <table class="posteditor-innertable">
                                    <tr v-for="(item, idx) in fieldsArray" :key="idx" class="posteditor-innertable-tr">
                                        <td><p class="posteditor-innertable-txt">{{ item.name }}</p></td>
                                        <td><button class="posteditor-innertable-tr-editbtn"  @click="OpenFieldOverlay(item, idx)">Edit field</button></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </SweetModalTab>
            <SweetModalTab title="Description" id="tab3">
                <div>
                    <table class="postedit-table">
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Description</p></td>
                            <td class="posteditor-td">
                                <textarea class="posteditor-td-textarea" name="description" v-model="post_description" placeholder="Description of post" cols="30" rows="10"></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
            </SweetModalTab>
            <SweetModalTab title="Images" id="tab4">
                <div>
                    <table class="postedit-table">
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Upload</p></td>
                            <td class="posteditor-td">
                                <UploadComponent @uploadthumbnail="uploadMultipleImages"></UploadComponent>
                            </td>
                        </tr>
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Images for post (max 5)</p></td>
                            <td class="posteditor-td posteditor-imagelist">
                                <div class="posteditor-imgpreview" v-for="(imgidx, idx) in images" :key="idx">
                                    <div class="posteditor-imgpreview-delete" @click="removeImageFromPost(imgidx)">
                                        <p>Click here to delete</p>
                                    </div>
                                    <img :src="'http://localhost:5555/api/image/'+imgidx" alt="Image for post">
                                </div>
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
                            <input class="posteditor-input" placeholder="Name" v-model="fieldname" type="text" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Recommended number of people</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" placeholder="Amount of people" v-model="recommended_people" type="number" min="0" max="300" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Price/hour</p></td>
                        <td class="posteditor-td">
                            <input class="posteditor-input" placeholder="Price" v-model="price" type="number" min="0" max="10000" />
                        </td>
                    </tr>
                    <tr class="posteditor-tr">
                        <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Sport tags</p></td>
                        <td class="posteditor-td">
                            <p class="posteditor-selectedtags-txt">Current selected tags: </p>
                            <!-- Loop this for every tag! -->
                            <div class="posteditor-showselectedtags">
                                <span class="posteditor-selectedtag" v-for="(element, i) in tags" :key="i">
                                    <p class="posteditor-selectedtag-closebtn"><font-awesome-icon :icon="['fas', 'times']" @click="removeTagFromField(element)" /></p>
                                    <p>{{ element }}</p>
                                </span>
                            </div>
                            <select class="posteditor-selectedtag-input" v-model="currentSelectedSport" @click="addTagToField">
                                <option value="">Select your tag</option>
                                <option v-for="(item, idx) in unselected_tags" :key="idx">{{ item }}</option>
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
import TagComponent from '../TagComponent.vue'
import UploadComponent from '../UploadFileComponent.vue'
import { VueTags } from 'vue-tags-component';
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import axios from 'axios'
import qs from 'qs'

export default {
    name: 'overlay-editpost',
    components: { SweetModal, VueTags, TagComponent, UploadComponent, SweetModalTab },
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
    mounted(){
        this.$store.dispatch('getSportTags')
    },
    data() {
        return {
            currentSelectedSport: null,
            currentFieldId: null,
            currentField: null,
            fieldsArray: [],
            newFieldName: '',
            fieldname: '',
            recommended_people: 0,
            price: 0,
            tags: [],
            unselected_tags: [],
            post_title: '',
            post_location: '',
            post_description: '',
            thumbnail: null,
            images: [], 
        }
    },
    watch: { 
        open: function(newVal, oldVal) {
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
            if(this.newFieldName.length > 0){
                const field = {
                    name: this.newFieldName,
                    recommended: 0,
                    price: 0,
                    tags: [],
                    unselected_tags: this.$store.getters.getSportTags
                }
                this.fieldsArray.push(field)
                this.newFieldName = ''
            }
        },
        editField(field){
            console.log("Editing field: ", field); // To remove
        },
        OpenFieldOverlay(item, idx){
            console.log("OPENING FIELD: ", item); // To remove
            this.currentField = item
            this.currentFieldId = idx
            this.fieldname = item.name
            this.recommended_people = item.recommended
            this.price = item.price
            this.tags = item.tags
            this.unselected_tags = item.unselected_tags
            this.$refs.fieldOverlay.open()
        },
        closeFieldOverlay(){
            this.currentField.name = this.fieldname
            this.currentField.recommended = this.recommended_people
            this.currentField.price = this.price
            this.currentField.tags = this.tags
            this.currentField.unselected_tags = this.unselected_tags
            this.fieldsArray[this.currentFieldId] = this.currentField
            this.currentField = null
            this.currentFieldId = null
        },
        addTagToField(){
            const filteredList = this.unselected_tags.filter((value) => { return this.currentSelectedSport !== value })
            if(filteredList.length !== this.unselected_tags.length){
                this.tags.push(this.currentSelectedSport)
                this.unselected_tags = filteredList
                this.currentSelectedSport = null
            }
        },
        removeTagFromField(element){
            const filteredList = this.tags.filter((value) => { return element !== value })
            this.unselected_tags.push(element)
            this.tags = filteredList
        },
        sendPost(){
            const post = {
                name: this.post_title,
                location: this.post_location,
                description: this.post_description,
                fields: this.fieldsArray,
                thumbnail: this.thumbnail,
                images: this.images
            }
            console.log("Sending post: ", post);
        },
        uploadthumbnail(thumbnail){
            this.disableSaveButton()
            axios.post("http://localhost:5555/api"+'/uploadimage', thumbnail, { withCredentials: true})
            .then(response => {
                if(response.data.success){
                    this.thumbnail = response.data.imageid
                }
                this.enableSaveButton()
            })
            .catch(err => {
                console.log("Error while sending image:", err);
            })
        },
        uploadMultipleImages(image){
            if(this.images.length < 6){
                axios.post("http://localhost:5555/api"+'/uploadimage', image, { withCredentials: true})
                .then(response => {
                    if(response.data.success){
                        this.images.push(response.data.imageid)
                    }
                    this.enableSaveButton()
                })
                .catch(err => {
                    console.log("Error while sending image:", err);
                })
            }
        },
        removeImageFromPost(imgidx){
            this.images = this.images.filter((value) => { return imgidx !== value })
        },
        disableSaveButton(){
            // Disable save button
        },
        enableSaveButton(){
            // Enable save button
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

.posteditor-td-textarea {
    padding: 10px;
    width: 100%;
    resize: vertical;
}

.posteditor-imgpreview {
    position: relative;
    display: flex;
    align-items: center;
    height: 200px;
    margin: 10px 0;
    overflow: hidden;
}

.posteditor-imgpreview img {
    margin: 10px;
    border: 1px solid silver;
}

.posteditor-imgpreview img {
    width: 100%;
    max-height:200px;
    max-width:100%;
    width: auto;
    height: auto;
}

.posteditor-imagelist {
    display: flex;
    flex-wrap: wrap;
}

.posteditor-imgpreview-delete {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    height: 30px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    font-family: Nunito;
}

.posteditor-imgpreview-delete:hover {
    cursor: pointer;
    background-color: #95a5a6;
}

.posteditor-imgpreview-thumbnail {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.posteditor-imgpreview-thumbnail img {
    width: 100%;
    max-height:200px;
    max-width:100%;
    width: auto;
    height: auto;
    border: 1px solid silver;
}

</style>