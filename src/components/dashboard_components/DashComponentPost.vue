<template>
    <div id="postcomponent">
        <CreatePost title="Create post" :editor="false" :open="openPostCreator" @close="closePostCreator" />
        <EditPost :editor="true" title="Edit post" :open="openPostEditor" :post="currentActivePost" :postid="currentActivePostID" @close="closePostEditor" />
        <div class="post-toolbar">
            <div class="add-post-btn" @click="openPostCreator = true" >
                <font-awesome-icon :icon="['fas', 'plus']" class="add-post-logo" />
            </div>
            <div class="search-name-input">
                <div class="filter-input">
                    <input type="text" required>
                    <span></span>
                    <label class="input-search">Search</label>
                </div>
            </div>
        </div>
        <div class="post-container">
            <div class="empty-posts" v-if="getOwnersPost.length < 1">
                <p class="empty-txt">It's pretty empty around here, try to add a project!</p>
            </div>
            <div class="posts" v-else>
                <EditPostCard v-for="(item, i) in users_post" :key="i" :title="item.title" :postid="item.post_id" :imageid="item.image">
                    <div @click="openEditor(item.post_id)" class="single-edit-btn">
                        <font-awesome-icon :icon="['fas', 'edit']" />
                    </div>
                </EditPostCard>
            </div>
        </div>
    </div>
</template>
<script>
import EditPostCard from './DashComponentSingleArticle.vue'
import CreatePost from '../overlay/PostEditor.vue'
import EditPost from '../overlay/PostEditor.vue'

export default {
    name: 'dashcomponentpost',
    components: { EditPostCard, CreatePost, EditPost },
    mounted(){
        this.users_post = this.$store.getters.getOwnersPost
    },
    data () {
        return {
            openPostCreator: false,
            openPostEditor: false,
            currentActivePost: null,
            currentActivePostID: -1,
            users_post: []
        }
    },
    computed: {
        getOwnersPost(){
            return this.$store.getters.getOwnersPost
        },
        getOpenPostEditor(){
            return this.openPostEditor
        },
        getCurrentActiveEditPostInformation(){
            return this.$store.getters.getCurrentActiveEditPostInformation
        }
    },
    watch:{
        getOwnersPost: function(data){
            this.users_post = data
            console.log("New value: ", data);
        },
        getCurrentActiveEditPostInformation: function(post){
            this.currentActivePost = post
        }
    },
    methods: {
        closePostCreator(){
            this.openPostCreator = false;
        },
        closePostEditor(){
            this.openPostEditor = false;
        },
        openEditor(postid){
            this.currentActivePostID = postid
            this.openPostEditor = true;
            this.$store.dispatch('setOwnersCurrentActiveEditPost', this.currentActivePostID)
        }
    }
}
</script>

<style>
#postcomponent {
    width: 100%;
    height: 100%;
    background-color: #f7f6f9;
}

.post-toolbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    width: 100%;
    background: rgb(195,55,100);
}

.add-post-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 50px;
    background-color: #85144b;
    margin: 0 25px;
    border-radius: 25px;
}

.add-post-btn:hover {
    background-color: #4b134f;
    cursor: pointer;
    transform: rotate(90deg);
    transition: 0.25s;
}

.search-name-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 200px;
}

.add-post-logo {
    font-size: 32px;
    color: #3D9970;
}


.filter-input {
    position: relative;
    border-bottom: 1px solid silver;
}

.filter-input input {
    height: 40px;
    width: 100%;
    padding: 0 5px;
    border: none;
    outline: none;
    background: none;
    color: white;
}

.filter-input label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.25s;
}

.filter-input span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4e4376;
    transition: 0.25s;
}

.filter-input input:focus ~ label,
.filter-input input:valid ~ label {
    font-size: 10px;
    top: -5px;
    transition: 0.25s;
}

.filter-input input:focus ~ span::before,
.filter-input input:valid ~ span::before {
    width: 100%;
    transition: 0.25s;
}

.input-search {
    color: white;
    font-family: Nunito;
    font-size: 12px;
}

.post-container {
    height: calc(100% - 100px);
    width: 100%;
}

.empty-posts {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    width: 100%;
}

.empty-txt {
    font-family: NUnito;
    font-size: 16px;
}

.posts {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
}

.posts > * {
    margin: 8px;
}

@media screen and (max-width: 520px) {
    .posts {
        justify-content: center;
    }
}

.single-edit-btn,
.single-delete-btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.single-edit-btn {
    background: #00aaa0;
}

.single-edit-btn:hover {
    background-color:  #8ed2c9;
}
</style>