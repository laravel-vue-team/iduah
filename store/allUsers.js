export const state = () => ({
  allUsers: {},
  currentPage: null,
  isThereNextPage: null,
})

export const getters = {
  allUsers: (state) => state.allUsers,
  currentPage: (state) => state.currentPage,
  isThereNextPage: (state) => state.isThereNextPage,
}

export const mutations = {
  setAllUsers(state, allUsers) { state.allUsers = allUsers },
  setCurrentPage(state, currentPage) { state.currentPage = currentPage },
  setIsThereNextPage(state, isThereNextPage) { state.isThereNextPage = isThereNextPage },
}

export const actions = {
  fetchAllUsers({ commit }) {
    this.$axios.get("/api/users")
      .then(res => {
        commit("setAllUsers", res.data.data.data);
      })
      .catch(err => {
        console.log(err.response);
      })
  },
}

