import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    authenticated: false,
    articles: [],
    currentArticle: null,
    register: null,
    registerMsg: null
}

const mutations = {
    setLogState(state, isLogged){
        state.authenticated = isLogged
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
    }
}

const actions = {
    checkUserIsAlreadyConnected(context){
        axios.get('http://localhost:9999/api/connected')
        .then(response => {
            context.commit('setLogState', response.data.logged)
        })
    },
    getArticlesList(context){
        axios.get('http://localhost:9999/api/all-articles')
        .then(response => { context.commit('setArticleState', response.data) })
    },
    getArticle(context, id){
        axios.get(`http://localhost:9999/api/getPost/${id}`)
        .then(response => { context.commit('setCurrentArticle', response.data) })
    },
    postRegisterOwner(context, registerCred){
        axios.post('http://localhost:9999/api/register', registerCred)
        .then(response => { context.commit('setRegisterState', response.data.success) })
        .catch(err => { 
            context.commit('setRegisterState', false)
            context.commit('setRegisterMessage', "Can't connect to server!")
        })
    },
    resetRegisterStates(context){
        context.commit('resetRegisterState')
    }
}

const getters = {
    isUserConnected(state){
        return state.authenticated
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