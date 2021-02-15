
export const state = () => ({
  privacy: "",
  terms: "",
  data: {},
  id: 1,
});
export const getters = {
  privacy: (state) => state.privacy,
  terms: (state) => state.terms,
  id: (state) => state.id,
  data: (state) => state.data,
};

export const mutations = {
  setPrivacy(state, privacy) { state.privacy = privacy },
  setTerms(state, terms) { state.terms = terms },
  setId(state, id) { state.id = id },
  setData(state, data) { state.data = data },
};
export const actions = {
  fetchSettings({ commit }) {
    this.$axios
      .get("/api/settings")
      .then((res) => {
        console.log(res.data.data);
        commit("setPrivacy", res.data.data.privacy);
        commit("setTerms", res.data.data.terms);
        commit("setData", res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  editPrivacy({ commit }, newData) {
    this.$axios
      .put("/api/settings/update", newData)
      .then((res) => {
        console.log(res.data);
        console.log("new privacy");
        commit("setPrivacy", res.data.data.privacy);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.data);
      });
  },
  editTerms({ commit }, newData) {
    this.$axios
      .put("/api/settings/update", newData)
      .then((res) => {
        console.log(res.data);
        console.log("new terms");
        commit("setTerms", res.data.data.terms);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.data);
      });
  }
};
