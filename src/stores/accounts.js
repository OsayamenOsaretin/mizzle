import { login as asyncLogin, register as asyncRegister } from '../auth';

const accounts = {
  namespaced: true,

  state: {
    authenticated: false,
  },

  getters: {
    /**
     * Gets authentication state
     * default value stored in localStorage
     * use || to allow reactivity with store change
     * @param {Object} state
     *
     * @returns {boolean} authenticated
     */
    getAuthenticationState: state => (
      state.authenticated || !!localStorage.getItem('token')
    ),
  },

  mutations: {
    /**
     * login mutation
     * @param {Object} state
     *
     * @returns {void}
     */
    login: (state) => {
      state.authenticated = !!localStorage.getItem('token');
    },

    /**
     * logout mutation
     * @param {Object} state
     *
     * @returns {void}
     */
    logout: (state) => {
      state.authenticated = false;
    },
  },

  actions: {
    /**
     * login store action
     * @param {function} commit
     * @param {Object} details
     *
     * @returns {void}
     */
    login({ commit }, { details }) {
      asyncLogin(details)
        .then(({ data: { token } }) => {
          localStorage.setItem('token', token);
          commit('error/clearErrors', null, { root: true });
          commit('login');
        })
        .catch(({ response: { data: { error } } }) => {
          commit('error/loginError', error, { root: true });
        });
    },

    /**
     * register store action
     * @param {function} commit
     * @param {Object} details
     *
     * @returns {void}
     */
    register({ commit }, { details }) {
      asyncRegister(details)
        .then(({ data: { token } }) => {
          localStorage.setItem('token', token);
          commit('error/clearErrors', null, { root: true });
          commit('login');
        })
        .catch(({ response: { data: { error } } }) => {
          commit('error/registerError', error, { root: true });
        });
    },

    /**
     * logout store action
     * @param {function} commit
     *
     * @returns {void}
     */
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('logout');
    },
  },
};

export default accounts;
