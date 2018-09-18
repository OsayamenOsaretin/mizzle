import Vuex from 'vuex';
import Vue from 'vue';
import AccountStore from './stores/accounts';
import ErrorStore from './stores/errors';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    account: AccountStore,
    error: ErrorStore,
  },
});

export default store;
