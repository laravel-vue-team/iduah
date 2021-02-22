export const state = () => ({
  categories: [],
  newCategory: null,
});
export const getters = {
  categories: (state) => state.categories,
};

export const mutations = {
  setCategories(state, categories) { state.categories = categories },
  addCategory(state, category) { state.categories = [...state.categories, category] },
};
export const actions = {
  fetchCategories({ commit }) {
    this.$axios
      .get("/api/categories")
      .then((res) => {
        commit("setCategories", [...res.data.data]);
      })
      .catch((err) => {
      });
  },
  setCategories({ commit }, categories) {
    commit("setCategories", categories);
  },
  addCategory({ commit }, category) {
    commit("addCategory", category);
  },
  deleteCategory({ commit, state }, obj) {
    let config = {
      method: "delete",
      url: `http://idauh.com/idauh/api/categories/${obj.id}/delete`,
    };
    this.$axios(config)
      .then((response) => {
        let arr = [...state.categories];
        arr.splice(obj.index, 1);
        commit("setCategories", arr);
      })
      .catch((error) => {
      });
  },
  editCategory({ commit, state }, obj) {
    this.$axios.post(`/api/categories/${obj.id}/update`, { title: obj.title, status: 1 })
      .then(res => {
        let arr = [...state.categories];
        arr[obj.index] = { ...arr[obj.index], title: obj.title };
        commit("setCategories", arr);
      })
      .catch(err => {
      })
  }
};
