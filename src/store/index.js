import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import qs from 'qs'

const apiURL = "http://localhost:5555/api"

Vue.use(Vuex)

const state = {
    authenticated: null,
    authenticationMsg: null,
    articles: [],
    currentArticle: null,
    register: null,
    registerMsg: null
}

const mutations = {
    setLogState(state, isLogged){
        state.authenticated = isLogged
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
    }
}

const actions = {
    checkUserIsAlreadyConnected(context){
        axios.get(apiURL+'/connected')
        .then(response => {
            if(response.data.logged){
                context.commit('setLogState', true)
            }
        })
    },
    getArticlesList(context){
        axios.get(apiURL+'/getPosts')
        .then(response => { context.commit('setArticleState', response.data) })
    },
    getArticle(context, id){
        axios.get(apiURL+`/getPost/${id}`)
        .then(response => { context.commit('setCurrentArticle', response.data) })
    },
    postLoginCredentials(context, loginCred){
        axios.post(apiURL+'/login', qs.stringify(loginCred), { withCredentials: true })
        .then(response => {
            context.commit('setLogState', response.data.success)
            context.commit('setLogMsg', response.data.errorMsg)
        })
        .catch(err => {
            context.commit('setLogState', false)
            context.commit('setLogMsg', "Can't connect to server!")
        })
    },
    postRegisterOwner(context, registerCred){
        axios.post(apiURL+'/register', registerCred)
        .then(response => { context.commit('setRegisterState', response.data.success) })
        .catch(err => { 
            context.commit('setRegisterState', false)
            context.commit('setRegisterMessage', "Can't connect to server!")
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
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});