
export const state = () => ({
  categories: [],
  newCategory: null,
});
export const getters = {
  categories: (state) => state.categories,
};

export const mutations = {
  setCategories(state, categories) { state.categories = categories },
};
export const actions = {
  fetchCategories({ commit }) {
    console.log("fetching categories");
    this.$axios
      .get("/api/categories")
      .then((res) => {
        console.log(res.data.data);
        commit("setCategories", [...res.data.data]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  setCategories({ commit }, categories) {
    commit("setCategories", categories);
  },
  // addCategory({ commit }, category) {
  //   commit("addCategory", category);
  // },
};
