import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import qs from 'qs'

const apiURL = "http://localhost:5555/api"
axios.defaults.withCredentials = true;

Vue.use(Vuex)

const state = {
    authenticated: null,
    userid: null,
    user_is_renter: null,
    user_is_owner: null,
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
    currentProfile_isRenter: null
}

const mutations = {
    setLogState(state, data){
        state.authenticated = data.logged
        state.userid = data.userid
        state.user_is_renter = data.is_renter
        state.user_is_owner = data.is_owner
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
    }
}

const actions = {
    logoutUser(context){
        context.commit('setLogoutState')
    },
    checkUserIsAlreadyConnected(context){
        axios.get(apiURL+'/connected', {withCredentials: true})
        .then(response => {
            if(response.data.logged){
                context.commit('setLogState', response.data)
            }
        })
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
            console.log("Exec!!");
            if(response.data.success){
                console.log("Good state");
                context.commit("setProfileViewer", response.data)
            } else {
                console.log("Bad state!!");
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
    resetRegisterStates(context){
        context.commit('resetRegisterState')
    },
    resetLoginState(context){
        context.commit('resetLoginState')
    }
}

const getters = {
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
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});