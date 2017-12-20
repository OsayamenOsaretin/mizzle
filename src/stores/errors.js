const errors = {
  namespaced: true,
  state: {
    loginError: '',
    registerError: '',
    logoutError: '',
  },

  getters: {
    getLoginError: state => (
      state.loginError
    ),
    getRegisterError: state => (
      state.registerError
    ),
    getLogoutError: state => (
      state.logoutError
    ),
  },

  mutations: {
    clearErrors: (state) => {
      state.loginError = '';
      state.registerError = '';
      state.logoutError = '';
    },
    loginError: (state, errorMessage) => {
      state.loginError = errorMessage;
    },
    registerError: (state, errorMessage) => {
      state.registerError = errorMessage;
    },
    logoutError: (state, errorMessage) => {
      state.logoutError = errorMessage;
    },
  },
};

export default errors;
