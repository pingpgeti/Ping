export const state = () => ({
  swipingLocked: false
});

export const getters = {
  swipingLocked(state) {
    return state.swipingLocked;
  }
}

export const mutations = {
  lock(state) {
    state.swipingLocked = true;
  },
  unlock(state) {
    state.swipingLocked = false;
  },
}