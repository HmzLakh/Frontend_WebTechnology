<template>
    <SweetModal title="Edit post" ref="overlay" @close="overlayClosed">
        <div id="overlay-editpost">
            <table id="postedit-table">
                <tr class="posteditor-tr">
                    <td class="posteditor-td">Title</td>
                    <td class="posteditor-td">
                        <input type="text" />
                    </td>
                </tr>
                <tr class="posteditor-tr">
                    <td class="posteditor-td">Thumbnail</td>
                    <td class="posteditor-td">
                        <UploadComponent></UploadComponent>
                    </td>
                </tr>
               <tr class="posteditor-tr">
                    <td class="posteditor-td">Images (max 5)</td>
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
                <tr class="posteditor-tr">
                    <td class="posteditor-td">Names of rooms</td>
                    <td class="posteditor-td">
                        <TagComponent></TagComponent>
                    </td>
                </tr>
                <tr class="posteditor-tr">
                    <td class="posteditor-td">Sport tags</td>
                    <td class="posteditor-td posteditor-vuetags">
                        <!-- VueTags is not responsive, look for another plugin!!! -->
                        <VueTags
                        :active="activeSportTags"
                        :all="allSportTags"
                        :element-count-for-start-arrow-scrolling="3"
                        :tab-index="2"
                        :tag-creation-enabled="false"
                        :colors-enabled="false"
                        :colors="colors"
                        :tagColorDefault="'#C33764'"
                        @on-tag-added="onSportTagAdded"
                        @on-tag-removed="onSportTagRemoved"
                        @on-tag-list-opened="onSportTagListOpened"
                        @on-tag-list-closed="onSportTagListClosed" />
                    </td>
                </tr>
            </table>
            <button class="postedit-savebtn">Save</button>
        </div>
    </SweetModal> 
</template>
<script>
import UploadImages from "vue-upload-drop-images"
import TagComponent from '../TagComponent.vue'
import UploadComponent from '../UploadFileComponent.vue'
import { VueTags } from 'vue-tags-component';
import { SweetModal } from 'sweet-modal-vue'

export default {
    name: 'overlay-editpost',
    components: { SweetModal, VueTags, TagComponent, UploadImages, UploadComponent },
    props: ['open'],
    data () {
        return {
            colors: ['#0099ff', '#4cca3c', '#ff5460', '#963dff', '#FFB800'],
            allSportTags: [],
            activeSportTags: []
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
        onSportTagAdded(e){
            this.activeSportTags.push(e)
        },
        onSportTagRemoved(e){
            this.activeSportTags = this.activeSportTags.filter(el => el !== e)
        },
        onSportTagListOpened(){
            return null
        },
        onSportTagListClosed(){
            return null
        },
        handleImages(files) {
            console.log(files)
        },
        overlayClosed(){
            this.$emit('close')
        }
    },
    created: function () {
        // TODO => make request in order to get sport types!
        this.tmpsports = [
            {
                id: 0,
                sport: "football"
            },
            {
                id: 1,
                sport: "basketball",
            },
            {
                id: 2,
                sport: "handball"
            },
            {
                id: 3,
                sport: "hassball"
            },
            {
                id: 4,
                sport: "rotonde"
            }
            ]
        this.tmpsports.forEach((sport) => {
            this.allSportTags.push({
                id: sport.id,
                name: sport.sport,
                slug: sport.sport
            })
        })
    }
}
</script>

<style>
#overlay-editpost {
    height: 55vh;
    width: 100%;
}

#postedit-table > tr > td {
  border: 1px solid black;
}

.postedit-savebtn {
    margin-top: 10px;
    height: 30px;
    width: 80%;
    border-radius: 25px;
    border: none;
    outline: none;
    background-color: red;
}

.postedit-savebtn:hover {
    background-color: black;
}


/* Responsive css */
#postedit-table {
    width: 100%;
}

.posteditor-tr {
    display: flex;
    flex-direction: column;
}

.posteditor-td {
    width: 100%;
}
</style>