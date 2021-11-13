import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    authenticated: false
}

const mutations = {
    setLogState(state, isLogged){
        state.authenticated = isLogged
    }
}

const actions = {
    checkUserIsAlreadyConnected(context){
        axios.get('http://localhost:9999/api/connected')
        .then(response => {
            context.commit('setLogState', response.data.logged)
        })
    }
}

const getters = {
    isUserConnected(state){
        return state.authenticated
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});