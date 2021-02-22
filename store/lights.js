
export const state = () => ({
  lights: [],
  newLight: null,
  currentPage: null,
  currentLight: {
    // user_id: 2,
    // user: { name: "abdallah" },
    // created_at: 642423423,
    // description: "description here",
    // likes: [1, 2, 3],
    // id: 2,
    // views: [1, 2, 3]
  },
  isLoading: false,
  isThereNextPage: null,
  isTherePrevPage: null,
});
export const getters = {
  lights: (state) => state.lights,
  currentPage: (state) => state.currentPage,
  currentLight: (state) => state.currentLight,
  isLoading: (state) => state.isLoading,
  isThereNextPage: (state) => state.isThereNextPage,
  isTherePrevPage: (state) => state.isTherePrevPage,
};

export const mutations = {
  setLights(state, lights) { state.lights = lights },
  setIsLoading(state, isLoading) { state.isLoading = isLoading },
  setCurrentPage(state, currentPage) { state.currentPage = currentPage },
  setIsThereNextPage(state, isThereNextPage) { state.isThereNextPage = isThereNextPage },
  setIsTherePrevPage(state, isTherePrevPage) { state.isTherePrevPage = isTherePrevPage },
  setCurrentLight(state, currentLight) { state.currentLight = currentLight },
  addLight(state, light) {
    state.newLight = light;
    state.lights = [light, ...state.lights];
  },
  addLights(state, lights) {
    state.lights = [...state.lights, ...lights];
  },
  addLike(state, lightId) {
    state.lights.forEach((light) => {
      if (light.id === lightId) {
        light.likes.push({});
      }
    });
  },
  removeLike(state, lightId) {
    state.lights.forEach((light) => {
      if (light.id === lightId) {
        light.likes.pop();
      }
    });
  },
  viewLight(state, lightIndex) {
    state.lights[lightIndex].views.push({});
  }
};
export const actions = {
  fetchLights({ commit }) {
    this.$axios
      .get("/public/api/lights")
      .then((res) => {
        commit("setLights", [...res.data.data.data]);
        commit("setCurrentPage", res.data.data.current_page);
        commit("setIsThereNextPage", res.data.data.next_page_url ? true : false);
        commit("setIsTherePrevPage", res.data.data.prev_page_url ? true : false);
      })
      .catch((err) => {
      });
  },
  setLights({ commit }, lights) {
    commit("setLights", lights);
  },
  addLight({ commit }, light) {
    commit("addLight", light);
  },
  addLights({ commit }, res) {
    commit("setCurrentPage", res.current_page);
    commit("setIsThereNextPage", res.next_page_url ? true : false);
    commit("addLights", res.data);
  },
  async deleteLight({ commit, state }, obj) {
    try {
      let res = await this.$axios.delete(`/api/lights/${obj.id}/delete`);
      let arr = [...state.lights];
      arr.splice(obj.index, 1);
      commit("setLights", arr);
    } catch (e) {
    }

  }
};
