
export const state = () => ({
  articles: [],
  newArticle: null,
  currentPage: null,
  isThereNextPage: null,
});
export const getters = {
  articles: (state) => state.articles,
};

export const mutations = {
  setArticles(state, articles) { state.articles = articles },
  setCurrentPage(state, currentPage) { state.currentPage = currentPage },
  setIsThereNextPage(state, isThereNextPage) { state.isThereNextPage = isThereNextPage },
  setNewArticle(state, article) {
    state.newArticle = article;
    state.articles = [article, ...state.articles];
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
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  setArticles({ commit }, articles) {
    commit("setArticles", articles);
  },
  setNewArticle({ commit }, article) {
    commit("setNewArticle", article);
  },
  async deleteArticle({ commit, state }, obj) {
    try {
      let res = await this.$axios.delete(`/api/posts/${obj.id}/delete`);
      console.log(res.data);
      let arr = [...state.articles];
      arr.splice(obj.index, 1);
      commit("setArticles", arr);
    } catch (e) {
      console.log(e.response);
    }

  }
};
