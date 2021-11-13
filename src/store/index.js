import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    authenticated: false,
    articles: [],
    currentArticle: null
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
        .then(response => {
            context.commit('setArticleState', response.data)
        })
    },
    getArticle(context, id){
        axios.get('http://localhost:9999/api/getPost/${id}')
        .then(response => {
            context.commit('setCurrentArticle', response.data)
        })
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
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});