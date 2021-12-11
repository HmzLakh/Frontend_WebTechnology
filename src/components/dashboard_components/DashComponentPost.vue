<template>
    <div id="postcomponent">
        <CreatePost title="Create post" :editor="false" :open="openPostCreator" @close="closePostCreator"></CreatePost>
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
            <div class="empty-posts" v-if="!dataset">
                <p class="empty-txt">It's pretty empty around here...</p>
            </div>
            <div class="posts" v-else>
                <Post v-for="i in 20" :key="i" :title="'Title of this'"></Post>
            </div>
        </div>
    </div>
</template>
<script>
import Post from './DashComponentSingleArticle.vue'
import CreatePost from '../overlay/PostEditor.vue'

export default {
    name: 'dashcomponentpost',
    components: { Post, CreatePost },
    data () {
        return {
            dataset: ['dummy'],
            openPostCreator: false
        }
    },
    methods: {
        closePostCreator(){
            this.openPostCreator = false;
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
    height: 100%;
    width: 100%;
}

.empty-txt {
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
</style>