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
                                <img :src="$store.getters.getAPIURL+'/image/'+thumbnail" alt="Thumbnail">
                            </div>
                        </td>
                    </tr>
                </table>
                <p v-if="errorMsg !== null" class="posteditor-errormsg">{{ errorMsg }}</p>
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
                                    <tr v-for="(item, idx) in getFields" :key="idx" class="posteditor-innertable-tr">
                                        <td class="posteditor-innertable-tr-td-title"><p class="posteditor-innertable-txt">{{ item.name }}</p></td>
                                        <td class="posteditor-innertable-tr-td-editbtn"><button class="posteditor-innertable-tr-editbtn"  @click="OpenFieldOverlay(item, idx)">Edit field</button></td>
                                        <td class="posteditor-innertable-tr-td-dltbtn"><button class="posteditor-innertable-tr-td-dltbtn-btn"  @click="deleteField(item, idx)">Remove</button></td>
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
                                    <img :src="$store.getters.getAPIURL+'/image/'+imgidx" alt="Image for post">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </SweetModalTab>
            <SweetModalTab title="Informations" id="tab5">
                <div>
                    <table class="postedit-table">
                        <tr class="posteditor-tr">
                            <td class="posteditor-td posteditor-td-title"><p class="posteditor-table-txt">Phone number</p></td>
                            <td class="posteditor-td posteditor-imagelist">
                                <input class="posteditor-input" type="text" v-model="phonenumber" placeholder="+32 489 123 789" />
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
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import axios from 'axios'

export default {
    name: 'overlay-editpost',
    components: { SweetModal, TagComponent, UploadComponent, SweetModalTab },
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
                default: false
            },
            post: {},
            postid: {
                default: null
            }
    },
    mounted(){
        this.$store.dispatch('getSportTags')
    },
    computed: {
        getFields(){
            if(this.editor){
                return this.fieldsArray.concat(this.addedFieldsArray)
            } else {
                return this.fieldsArray
            }
        },
        getSportsTag(){
            return this.$store.getters.getSportTags
        },
        getPost(){
            return this.post
        }
    },
    data() {
        return {
            currentSelectedSport: null,
            currentFieldId: null,
            currentField: null,
            fieldsArray: [],
            deletedFieldsArray: [],
            addedFieldsArray: [],
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
            phonenumber: '',
            errorMsg: null
        }
    },
    watch: { 
        open: function(newVal, oldVal) {
            if(newVal == true) {
                this.$refs.overlay.open()
                // Also get informations needed in order to edit the post
                if(this.editor){
                    this.$store.dispatch('setOwnersCurrentActiveEditPost', this.postid)
                    if(this.post !== undefined){
                        const fields = []
                        for (const field of this.post.fields) {
                            const parsedField = {
                                id: field.field_id,
                                name: field.name,
                                recommended: field.recommended_number_of_persons,
                                price: field.price,
                                tags: (field.sports_names == null || field.sports_names == undefined) ? [] : field.sports_names,
                                unselected_tags: this.$store.getters.getSportTags
                            }
                            fields.push(parsedField)
                        }
                        this.post_title = this.post.name
                        this.post_location = this.post.address
                        this.post_description = this.post.description
                        this.fieldsArray = fields
                        this.thumbnail = this.post.thumbnail
                        this.images = this.post.images.map(x => x.image_id)   
                        this.phonenumber = this.post.phone_number
                    }
                }
            }
        }
    },
    methods: {
        overlayClosed(){
            this.$emit('close')
            this.errorMsg = null
            // Reset
            this.currentSelectedSport = null,
            this.currentFieldId = null,
            this.currentField = null,
            this.fieldsArray = [],
            this.deletedFieldsArray = [],
            this.addedFieldsArray = [],
            this.newFieldName = '',
            this.fieldname = '',
            this.recommended_people = 0,
            this.price = 0,
            this.tags = [],
            this.unselected_tags = [],
            this.post_title = '',
            this.post_location = '',
            this.post_description = '',
            this.thumbnail = null,
            this.images = [],
            this.phonenumber = '',
            this.errorMsg = null
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
                if(this.editor){
                    this.addedFieldsArray.push(field);
                } else {
                    this.fieldsArray.push(field)
                }
                this.newFieldName = ''
            }
        },
        deleteField(field, idx){
            if(this.editor){
                if(field.id !== undefined){
                    this.fieldsArray = this.fieldsArray.filter(function(value, index, arr){ return value.name !== field.name; });
                    this.deletedFieldsArray.push(field.id)
                } else {
                    this.addedFieldsArray = this.addedFieldsArray.filter(function(value, index, arr){ return value.name !== field.name; });
                }
            } else {
                this.fieldsArray = this.fieldsArray.filter(function(value, index, arr){ return index !== idx; });
            }
        },
        OpenFieldOverlay(item, idx){
            this.currentField = item
            this.currentFieldId = idx
            this.fieldname = item.name
            this.recommended_people = item.recommended
            this.price = item.price
            this.tags = item.tags
            this.unselected_tags = item.unselected_tags
            for (const sport of this.tags) {
                this.unselected_tags = this.unselected_tags.filter(x => x !== sport)
            }
            this.$refs.fieldOverlay.open()
        },
        closeFieldOverlay(){
            this.currentField.name = this.fieldname
            this.currentField.recommended = this.recommended_people
            this.currentField.price = this.price
            this.currentField.tags = this.tags
            this.currentField.unselected_tags = this.unselected_tags
            if(this.currentField.id !== undefined){
                this.fieldsArray = this.fieldsArray.filter((value, index, arr) => { return value.name !== this.currentField.name; });
                this.fieldsArray.push(this.currentField)
            } else {
                this.addedFieldsArray = this.addedFieldsArray.filter((value, index, arr) => { return value.name !== this.currentField.name; });
                this.addedFieldsArray.push(this.currentField)
            }
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
            this.errorMsg = null
            if(this.editor){
                const editPost = {
                    postid: this.postid,
                    name: this.post_title,
                    location: this.post_location,
                    description: this.post_description,
                    fields: this.fieldsArray,
                    deletedfields: this.deletedFieldsArray,
                    addedfields: this.addedFieldsArray,
                    thumbnail: this.thumbnail,
                    images: this.images,
                    phonenumber: this.phonenumber
                }
                if(editPost.name.length < 4){ // Form validation!
                    this.errorMsg = "Post title must be at least 4 characters"
                } else if(editPost.location.length == 0){
                    this.errorMsg = "Location cannot be empty!"
                } else if(editPost.description.length == 0){
                    this.errorMsg = "Description cannot be empty!"
                } else if(editPost.thumbnail == null || editPost.thumbnail.length == 0){
                    this.errorMsg = "Thumbnail cannot be empty!"
                } else if(editPost.images.length == 0){
                    this.errorMsg = "Please upload atleast one image!"
                } else if(editPost.phonenumber.length < 4){
                    this.errorMsg = "Phonenumber must be at least 4 charachter long"
                } else if(editPost.fields.concat(editPost.addedfields).length == 0) {
                    this.errorMsg = "You need to have atleast one field!"
                } else if(this.FormValidationEditFieldSport(editPost.fields.concat(editPost.addedfields))){
                    this.errorMsg = "Each field needs to have atleast one sport selected!"
                } else { // If everything is fine, send the request!
                    console.log("Sending to backend ", editPost);
                    this.$store.dispatch("postEditedUserPost", editPost);
                    this.$store.dispatch("getOwnersPost")
                    this.$refs.overlay.close()
                    this.overlayClosed()
                }
            } else {
                const newPost = {
                    name: this.post_title,
                    location: this.post_location,
                    description: this.post_description,
                    fields: this.fieldsArray,
                    thumbnail: this.thumbnail,
                    images: this.images,
                    phonenumber: this.phonenumber
                }
                if(newPost.name.length < 4){ // Form validation!
                    this.errorMsg = "Post title must be at least 4 characters"
                } else if(newPost.location.length == 0){
                    this.errorMsg = "Location cannot be empty!"
                } else if(newPost.description.length == 0){
                    this.errorMsg = "Description cannot be empty!"
                } else if(newPost.thumbnail == null || newPost.thumbnail.length == 0){
                    this.errorMsg = "Thumbnail cannot be empty!"
                } else if(newPost.images.length == 0){
                    this.errorMsg = "Please upload atleast one image!"
                } else if(newPost.phonenumber.length < 4){
                    this.errorMsg = "Phonenumber must be at least 4 charachter long"
                } else if(newPost.fields.length == 0) {
                    this.errorMsg = "You need to have atleast one field!"
                } else if(this.FormValidationFieldSport(newPost)){
                    this.errorMsg = "Each field needs to have atleast one sport selected!"
                } else { // If everything is fine, send the request!
                    this.$store.dispatch("postUserPost", newPost)
                    this.$store.dispatch("getOwnersPost")
                    console.log("Sending to backend ", newPost);
                    this.$refs.overlay.close()
                    this.overlayClosed()
                }
            }
            //this.$router.push('/home/post').catch(err => {})
        },
        FormValidationFieldSport(newPost){
            let result = false
            if(newPost.fields.length > 0){
                for (const field of newPost.fields) {
                   if(field.tags.length == 0){
                       result = true
                   } 
                }
            }
            return result
        },
        FormValidationEditFieldSport(fields){
            let result = false
            if(fields.length > 0){
                for (const field of fields) {
                   if(field.tags.length == 0){
                       result = true
                   } 
                }
            }
            return result
        },
        uploadthumbnail(thumbnail){
            this.disableSaveButton()
            axios.post(this.$store.getters.getAPIURL+'/uploadimage', thumbnail, { withCredentials: true})
            .then(response => {
                if(response.data.success){
                    this.thumbnail = response.data.imageid
                }
                this.enableSaveButton()
            })
        },
        uploadMultipleImages(image){
            if(this.images.length < 6){
                axios.post(this.$store.getters.getAPIURL+'/uploadimage', image, { withCredentials: true})
                .then(response => {
                    if(response.data.success){
                        this.images.push(response.data.imageid)
                    }
                    this.enableSaveButton()
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
    height: 100%;
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
    height: 100%;
    width: 100%;
}

.posteditor-innertable-tr-td-title {
    height: 100%;
    width: 60%;
}

.posteditor-innertable-tr-td-editbtn {
    height: 100%;
    width: 20%;
}

.posteditor-innertable-tr-td-dltbtn {
    height: 100%;
    width: 20%;
}

.posteditor-innertable-tr-td-dltbtn-btn {
    background-color: #95a5a6;
    color: white;
    border: none;
    border-radius: 3px;
    width: 100%;
    height: 30px;
}

.posteditor-innertable-tr-td-dltbtn-btn:hover {
    background-color: #7f8c8d;
}

.posteditor-innertable-tr-editbtn {
    background-color: #95a5a6;
    color: white;
    height: 30px;
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
    font-family: Nunito;
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

.posteditor-errormsg {
    text-align: center;
    font-size: 13px;
    font-style: italic;
    color: red;
}
</style>