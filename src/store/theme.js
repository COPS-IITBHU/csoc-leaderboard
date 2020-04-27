export default {
  state: {
    theme: 'dark',
    inTransition: false
  },
  getters: {
    currentTheme: state => {
      return state.theme;
    },
    inTransition: state => {
      return state.inTransition;
    }
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    }
  },
  actions: {
    toggle_theme({ state, commit }) {
      commit("TOGGLE_THEME");
      state.inTransition = true;
      setTimeout(() => {
        state.inTransition = false;
      }, 400);
    }
  }
};
