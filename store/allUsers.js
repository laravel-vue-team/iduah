export const state = () => ({
  users: {},
  currentPage: null,
  isThereNextPage: null,
  isTherePrevPage: null,
})

export const getters = {
  users: (state) => state.users,
  currentPage: (state) => state.currentPage,
  isThereNextPage: (state) => state.isThereNextPage,
  isTherePrevPage: (state) => state.isTherePrevPage,
}

export const mutations = {
  setUsers(state, users) { state.users = users },
  setCurrentPage(state, currentPage) { state.currentPage = currentPage },
  setIsThereNextPage(state, isThereNextPage) { state.isThereNextPage = isThereNextPage },
  setIsTherePrevPage(state, isTherePrevPage) { state.isTherePrevPage = isTherePrevPage },
}

export const actions = {
  fetchAllUsers({ commit }) {
    this.$axios.get("/api/users")
      .then(res => {
        commit("setUsers", res.data.data.data);
        commit("setCurrentPage", res.data.data.current_page);
        commit("setIsThereNextPage", res.data.data.next_page_url ? true : false);
        commit("setIsTherePrevPage", res.data.data.prev_page_url ? true : false);
      })
      .catch(err => {
      })
  },
}

