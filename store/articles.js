
export const state = () => ({
  articles: [],
  newArticle: null,
  currentArticle: {},
  currentPage: null,
  isLoading: false,
  lastPage: null,
  isThereNextPage: null,
  isTherePrevPage: null,
});
export const getters = {
  articles: (state) => state.articles,
  currentArticle: (state) => state.currentArticle,
  currentPage: (state) => state.currentPage,
  isLoading: (state) => state.isLoading,
  isThereNextPage: (state) => state.isThereNextPage,
  isTherePrevPage: (state) => state.isTherePrevPage,
};

export const mutations = {
  setArticles(state, articles) { state.articles = articles },
  setCurrentPage(state, currentPage) { state.currentPage = currentPage },
  setIsLoading(state, isLoading) { state.isLoading = isLoading },
  setIsThereNextPage(state, isThereNextPage) { state.isThereNextPage = isThereNextPage },
  setIsTherePrevPage(state, isTherePrevPage) { state.isTherePrevPage = isTherePrevPage },
  setNewArticle(state, article) {
    state.newArticle = article;
    state.articles = [article, ...state.articles];
  },
  setCurrentArticle(state, currentArticle) { state.currentArticle = currentArticle },
  addArticles(state, articles) {
    state.articles = [...state.articles, ...articles];
  },
};
export const actions = {
  fetchArticles({ commit }) {
    this.$axios
      .get("/api/posts")
      .then((res) => {
        commit("setArticles", [...res.data.data.data]);
        commit("setCurrentPage", res.data.data.current_page);
        commit("setIsThereNextPage", res.data.data.next_page_url ? true : false);
        commit("setIsTherePrevPage", res.data.data.prev_page_url ? true : false);
      })
      .catch((err) => {
      });
  },
  setArticles({ commit }, articles) {
    commit("setArticles", articles);
  },
  setNewArticle({ commit }, article) {
    commit("setNewArticle", article);
  },
  addArticles({ commit }, data) {
    commit("setCurrentPage", data.current_page);
    commit("setIsThereNextPage", data.next_page_url ? true : false);
    commit("addArticles", [...data.data]);
  },
  async deleteArticle({ commit, state }, obj) {
    try {
      let res = await this.$axios.delete(`/api/posts/${obj.id}/delete`);
      let arr = [...state.articles];
      arr.splice(obj.index, 1);
      commit("setArticles", arr);
    } catch (e) {
    }
  }
};
