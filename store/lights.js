
export const state = () => ({
  lights: [],
  newLight: null,
  currentPage: null,
  isThereNextPage: null,
});
export const getters = {
  lights: (state) => state.lights,
  currentPage: (state) => state.currentPage,
  isThereNextPage: (state) => state.isThereNextPage,
};

export const mutations = {
  setLights(state, lights) { state.lights = lights },
  setCurrentPage(state, currentPage) { state.currentPage = currentPage },
  setIsThereNextPage(state, isThereNextPage) { state.isThereNextPage = isThereNextPage },
  addLight(state, light) {
    state.newLight = light;
    state.lights = [light, ...state.lights];
  },
  addLights(state, lights) {
    state.lights = [...lights, ...state.lights];
  },
  addLike(state, lightId) {
    state.lights.forEach((light) => {
      if (light.id === lightId) {
        light.likes.push({});
      }
    });
  },
  removeLike(state, lightId) {
    console.log("like removed");
    state.lights.forEach((light) => {
      if (light.id === lightId) {
        light.likes.pop();
      }
    });
  },
  viewLight(state, lightIndex) {
    console.log("light viewing");
    state.lights[lightIndex].views.push({});
  }
};
export const actions = {
  fetchLights({ commit }) {
    console.log("fetching");
    this.$axios
      .get("/public/api/lights")
      .then((res) => {
        console.log(res.data);
        commit("setLights", [...res.data.data.data]);
        commit("setCurrentPage", res.data.data.data.current_page);
        commit("setIsThereNextPage", res.data.data.data.next_page_url ? true : false);
      })
      .catch((err) => {
        console.log(err.response);
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
      console.log(res.data);
      let arr = [...state.lights];
      arr.splice(obj.index, 1);
      commit("setLights", arr);
    } catch (e) {
      console.log(e.response);
    }

  }
};
