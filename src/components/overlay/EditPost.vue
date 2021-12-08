<template>
    <SweetModal ref="overlay" @close="overlayClosed">
        <div id="overlay-editpost">
            <table id="postedit-table">
                <tr>
                    <td>Title of post:</td>
                    <td>
                        <input type="text" />
                    </td>
                </tr>
                <tr>
                    <td>Image miniature</td>
                    <td>
                        <UploadComponent></UploadComponent>
                    </td>
                </tr>
                <tr>
                    <td>Sport tags</td>
                    <td>
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
               <!-- tr>
                    <td>Images</td>
                    <td>
                        <UploadImages
                            :max="5"
                            maxError='Max files exceed!'
                            uploadMsg="Drag and drop images here"
                            clearAll="remove all"
                            @changed="handleImages"
                        />
                    </td>
                </tr -->
                <tr>
                    <td>Names of rooms</td>
                    <td>
                        <TagComponent></TagComponent>
                    </td>
                </tr>
            </table>
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

        },
        onSportTagListClosed(){
            
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
    height: 60vh;
    width: 100%;
}

#postedit-table > tr > td {
  border: 1px solid black;
  width: 150px;
}
</style>