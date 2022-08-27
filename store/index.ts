export const state = () => ({
  swipingLocked: false,
  lang: 'pl-PL'
});

export const getters = {
  swipingLocked(state) {
    return state.swipingLocked;
  },
  lang(state) {
    return state.lang
  }
}

export const mutations = {
  lock(state) {
    state.swipingLocked = true;
  },
  unlock(state) {
    state.swipingLocked = false;
  },
  setLang(state, lang) {
    state.lang = lang;
  }
}