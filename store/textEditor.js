
export const state = () => ({
  privacy: "",
  terms: "",
  data: {},
  id: -1,
  isLoading: true,
});
export const getters = {
  privacy: (state) => state.privacy,
  terms: (state) => state.terms,
  id: (state) => state.id,
  data: (state) => state.data,
  isLoading: (state) => state.isLoading,
};

export const mutations = {
  setPrivacy(state, privacy) { state.privacy = privacy },
  setTerms(state, terms) { state.terms = terms },
  setId(state, id) { state.id = id },
  setData(state, data) { state.data = data },
  setIsLoading(state, isLoading) { state.isLoading = isLoading },
};
export const actions = {
  fetchSettings({ commit }) {
    commit("setIsLoading", true);
    this.$axios
      .get("/api/settings")
      .then((res) => {
        commit("setPrivacy", res.data.data.privacy);
        commit("setIsLoading", false);
        commit("setTerms", res.data.data.terms);
        commit("setData", res.data.data);
      })
      .catch((err) => {
        commit("setIsLoading", false);
      });
  },
  editPrivacy({ commit }, newData) {
    this.$axios
      .put("/api/settings/update", newData)
      .then((res) => {
        commit("setPrivacy", res.data.data.privacy);
      })
      .catch((err) => {
      });
  },
  editTerms({ commit }, newData) {
    this.$axios
      .put("/api/settings/update", newData)
      .then((res) => {
        commit("setTerms", res.data.data.terms);
      })
      .catch((err) => {
      });
  }
};
