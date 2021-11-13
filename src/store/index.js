import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    logstate: false
}

const mutations = {
    removeCountA(state){
        state.count--
    },
    setLogState(state, isLogged){
        state.logstate = isLogged
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
        return state.logstate
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});