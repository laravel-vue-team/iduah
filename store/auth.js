
export const state = () => ({
  token: null,
  user: null
});
export const getters = {
  isAuth: (state) => state.token !== null,
  token: (state) => state.token,
  user: (state) => state.user,
};

export const mutations = {
  setToken(state, token) { state.token = token },
  setUser(state, user) { state.user = user },
};
// access them using dispatch
export const actions = {
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  },
};
