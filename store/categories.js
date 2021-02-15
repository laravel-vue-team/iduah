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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editCategory({ commit, state }, obj) {
    this.$axios.post(`/api/categories/${obj.id}/update`, { title: obj.title, status: 1 })
      .then(res => {
        let arr = [...state.categories];
        console.log(arr);
        arr[obj.index] = { ...arr[obj.index], title: obj.title };
        commit("setCategories", arr);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      })
  }
};
