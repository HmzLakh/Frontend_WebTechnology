import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import qs from 'qs'

const apiURL = "http://localhost:5555/api"
axios.defaults.withCredentials = true;

Vue.use(Vuex)

const state = {
    apiurl: "http://localhost:5555/api",
    authenticated: null,
    userid: null,
    user_is_renter: null,
    user_is_owner: null,
    firstname: null,
    lastname: null,
    email: null,
    authenticationMsg: null,
    articles: [],
    currentArticle: null,
    register: null,
    registerMsg: null,
    currentProfile_show: null,
    currentProfile_username: null,
    currentProfile_firstName: null,
    currentProfile_lastName: null,
    currentProfile_email: null,
    currentProfile_isOwner: null,
    currentProfile_isRenter: null,
    editProfile_success: null,
    editProfile_errorMsg: null,
    dashboard_available: null,
    sportTags: [],
    ownersPost: [],
    ownersSinglePosts: [],
    mapInfo: []
}

const mutations = {
    setLogState(state, data){
        console.log("Just connected: ", data);
        state.authenticated = data.logged
        state.userid = data.userid
        state.user_is_renter = data.is_renter
        state.user_is_owner = data.is_owner
        state.firstname = data.firstname
        state.lastname = data.lastname
        state.email = data.email
        state.editProfile_success = null
        state.editProfile_errorMsg = null
        state.sportTags = []
        state.ownersPost = []
        state.ownersSinglePosts = []
    },
    setFailLogState(state){
        state.authenticated = false
    },
    setLogMsg(state, logMsg){
        state.authenticationMsg = logMsg
    },
    setArticleState(state, data){
        state.articles = data
    },
    setCurrentArticle(state, article){
        state.currentArticle = article
    },
    setRegisterState(state, bool){
        state.register = bool
    },
    setRegisterMessage(state, str){
        state.registerMsg = str
    },
    resetRegisterState(state){
        state.register = null
        state.registerMsg = null
    },
    resetLoginState(state){
        if(!state.authenticated){
            state.authenticated = null
        }
        state.authenticationMsg = null
    },
    setLogoutState(state){
        state.authenticated = null
        state.userid = null
        state.user_is_renter = null
        state.user_is_owner = null
        state.register = null
        state.registerMsg = null
        state.authenticationMsg = null
        state.firstname = null
        state.lastname = null
        state.email = null
    },
    setProfileViewer(state, data){
        state.currentProfile_show = data.success
        state.currentProfile_username = data.username
        state.currentProfile_firstName = data.first_name
        state.currentProfile_lastName = data.last_name
        state.currentProfile_email = data.email
        state.currentProfile_isOwner = data.is_owner
        state.currentProfile_isRenter = data.is_renter
    },
    resetProfileViewer(state){
        state.currentProfile_show = null
        state.currentProfile_username = null
        state.currentProfile_firstName = null
        state.currentProfile_lastName = null
        state.currentProfile_email = null
        state.currentProfile_isOwner = null
        state.currentProfile_isRenter = null
    },
    setBadProfileViewer(state, show){
        state.currentProfile_show = show
    },
    setEditProfileStatus(state, data){
        state.editProfile_success = data.success
        state.editProfile_errorMsg = data.errorMsg
    },
    resetEditProfile(state){
        state.editProfile_success = null
        state.editProfile_errorMsg = null
    },
    setSportTags(state, tags){
        state.sportTags = tags
    },
    setOwnersPost(state, data){
        state.ownersPost = data
    },
    setOwnersSinglePost(state, data){
        state.ownersSinglePosts[data.postid] = data.content
    },
    setMapInfo(state, data){
        const result = []
        for (const key of data) {
            key.maploc = [0, 0]
            result.push(key)
        }
        state.mapInfo = result
    },
    deletePost(state, postid){
        state.ownersPost = state.ownersPost.filter(post => post.post_id !== postid)
    },
    setDashboardAvailable(state, bool){
        state.dashboard_available = bool
    },
    resetDashboardAvailable(state){
        state.dashboard_available = null
    },
    editCurrentUserProfileState(state, data){
        state.firstname = data.fname
        state.lastname = data.lname
        state.email = data.email
    }
}

const actions = {
    logoutUser({ commit, dispatch }){
        axios.get(apiURL+'/logout', {withCredentials: true})
        .then(response => { 
            commit('setLogoutState')
            dispatch('checkUserIsAlreadyConnected')
        })
    },
    checkUserIsAlreadyConnected(context){
        axios.get(apiURL+'/connected', {withCredentials: true})
        .then(response => {
            if(response.data.logged){
                context.commit('setLogState', response.data)
                if(response.data.is_owner){
                    context.dispatch('getOwnersPost')
                }
            }
        })
    },
    checkDashboardAvailability(context){
        context.commit('setDashboardAvailable', !!context.getters.isUserConnected)
    },
    resetDashboardAvailability(context){
        context.commit('resetDashboardAvailable')
    },
    getArticlesList(context){
        axios.get(apiURL+'/getPosts', {withCredentials: true})
        .then(response => { context.commit('setArticleState', response.data) })
    },
    getArticle(context, id){
        axios.get(apiURL+`/getPost/${id}`, {withCredentials: true})
        .then(response => { context.commit('setCurrentArticle', response.data) })
    },
    postLoginCredentials({ commit, dispatch }, loginCred){
        axios.post(apiURL+'/login', qs.stringify(loginCred), {withCredentials: true})
        .then(response => {
            commit('setLogState', response.data.success)
            commit('setLogMsg', response.data.errorMsg)
            dispatch('checkUserIsAlreadyConnected')
        })
        .catch(err => {
            commit('setLogState', false)
            commit('setLogMsg', "Can't connect to server!")
        })
    },
    postRegisterOwner({ commit, dispatch }, registerCred){
        axios.post(apiURL+'/register', qs.stringify(registerCred), {withCredentials: true})
        .then(response => { 
            commit('setRegisterState', response.data.success)
            commit('setRegisterMessage', response.data.errorMsg)
            dispatch('checkUserIsAlreadyConnected')
        })
        .catch(err => { 
            commit('setRegisterState', false)
            commit('setRegisterMessage', "Can't connect to server!")
        })
    },
    postRegisterRenter({ commit, dispatch }, registerCred){
        axios.post(apiURL+'/register', qs.stringify(registerCred), {withCredentials: true})
        .then(response => { 
            commit('setRegisterState', response.data.success)
            commit('setRegisterMessage', response.data.errorMsg)
            dispatch('checkUserIsAlreadyConnected')
        })
        .catch(err => { 
            commit('setRegisterState', false)
            commit('setRegisterMessage', "Can't connect to server!")
        })
    },
    getProfileInfo(context, username){
        axios.get(apiURL+`/profile/${username}`, {withCredentials: true})
        .then(response => {
            if(response.data.success){
                context.commit("setProfileViewer", response.data)
            } else {
                context.commit("setBadProfileViewer", false)
            }
        })
        .catch(err => { 
            context.commit("setBadProfileViewer")
        })
    },
    resetProfileViewer(context){
        context.commit("resetProfileViewer")
    },
    postEditProfile({ commit, dispatch }, newProfileInfo){
        axios.post(apiURL+'/editprofile', qs.stringify(newProfileInfo), {withCredentials: true})
        .then(response => {
            commit('setEditProfileStatus', response.data)
            if(response.data.success){
                commit('editCurrentUserProfileState', newProfileInfo)
            }
        })
        .catch(err => { 
            commit('setEditProfileStatus', {success: false, errorMsg: "Check your connection!"})
        })
    },
    resetEditProfile(context){
        context.commit("resetEditProfile")
    },
    postUserReview(context, comment){
        console.log("Sended: ", comment);
        axios.post(apiURL+'/review', qs.stringify(comment), {withCredentials: true})
        .then(response => {
            console.log(response.data);
            context.dispatch("getArticle", comment.post_id)
        })
    },
    getSportTags(context){
        axios.get(apiURL+'/tags', {withCredentials: true})
        .then(response => {
            context.commit("setSportTags", response.data.tags)
        })
        .catch(err => { 
            context.commit("setSportTags", ['Empty'])
        })
    },
    postUserPost(context, post){
        axios.post(apiURL+'/post', qs.stringify(post), {withCredentials: true})
        .then(response => {
            // Show overlay to user?
            console.log("Got as anwser (create): "+JSON.stringify(response.data));
            context.dispatch("getOwnersPost")
        })
        .catch(err => { 
            console.log("Erreur when making request!");
        })
    },
    postEditedUserPost(context, post){
        console.log("Send edited post: ", post)
        axios.put(apiURL+'/post', qs.stringify(post), {withCredentials: true})
        .then(response => {
            // Show overlay to user?
            console.log("Got as anwser (edit): "+JSON.stringify(response.data));
        })
        .catch(err => { 
            console.log("Erreur when making request!");
        })
    },
    getOwnersPost(context){
        axios.get(apiURL+'/getMyPosts', {withCredentials: true})
        .then(response => {
            // Init also data of posts for owners!
            context.commit("setOwnersPost", response.data)
            for (const x of response.data) {
                context.dispatch('getOwnerSinglePost', x.post_id)
            }
        })
    },
    getOwnerSinglePost(context, postid){
        axios.get(apiURL+'/getMyPost/'+postid, {withCredentials: true})
        .then(response => {
            context.commit("setOwnersSinglePost", {postid, content: response.data})
        })
    },
    getMapInfo(context){
        axios.get(apiURL+'/getmap', {withCredentials: true})
        .then(response => {
            context.commit("setMapInfo", response.data)
        })
    },
    deletePost(context, deleteObject){
        axios.post(apiURL+'/deletepost', qs.stringify(deleteObject), { withCredentials: true}).then(response => {
            context.commit("deletePost", deleteObject.postid)
            console.log("Response ", response.data);
        })
    },
    sendOpinion(context, value){
        axios.post(apiURL+'/opinion', qs.stringify(value), { withCredentials: true}).then(response => {
            console.log("Response ", response.data);
        })
    },
    resetRegisterStates(context){
        context.commit('resetRegisterState')
    },
    resetLoginState(context){
        context.commit('resetLoginState')
    }
}

const getters = {
    getAPIURL(state){
        return state.apiurl
    },
    isUserConnected(state){
        return state.authenticated
    },
    getAuthenticationMessage(state){
        return state.authenticationMsg
    },
    getArticles(state){
        return state.articles
    },
    getCurrentArticle(state){
        return state.currentArticle;
    },
    getRegisterStatus(state){
        return state.register
    },
    getRegisterMessageStatus(state){
        return state.registerMsg
    },
    getProfileInformations(state){
        const info = {
            username: state.currentProfile_username,
            firstname: state.currentProfile_firstName,
            lastname: state.currentProfile_lastName,
            email: state.currentProfile_email,
            isOwner: state.currentProfile_isOwner,
            isRenter: state.currentProfile_isRenter,
        }
        return info
    },
    getProfileStatus(state){
        return state.currentProfile_show
    },
    getUserProfile(state){
        const info = {
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email,
            is_renter: state.user_is_renter,
            is_owner: state.user_is_owner,
        }
        return info
    },
    getEditProfileStatus(state){
        return state.editProfile_success
    },
    getEditProfileMsgError(state){
        return state.editProfile_errorMsg
    },
    getSportTags(state){
        return state.sportTags
    },
    getOwnersPost(state){
        return state.ownersPost
    }, 
    getOwnersSinglePost(state){
        return state.ownersSinglePosts
    },
    getMapInfo(state){
        return state.mapInfo
    },
    getDashboardAvailability(state){
        return state.dashboard_available
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});