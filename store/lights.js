
export const state = () => ({
  lights: [],
  newLight: null
});
export const getters = {
  lights: (state) => state.lights,
};

export const mutations = {
  setLights(state, lights) { state.lights = lights },
  setNewLight(state, light) {
    state.newLight = light;
    state.lights = [light, ...state.lights];
  },
  addLights(state, lights) {
    state.lights = [...lights, ...state.lights];
  }
};
export const actions = {
  setLights({ commit }, lights) {
    commit("setLights", lights);
  },
  setNewLight({ commit }, light) {
    commit("setNewLight", light);
  },
  addLights({ commit }, lights) {
    commit("addLights", lights);
  }
};
