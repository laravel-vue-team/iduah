
export const state = () => ({
  articles: [],
  newArticle: null
});
export const getters = {
  articles: (state) => state.articles,
};

export const mutations = {
  setArticles(state, articles) { state.articles = articles },
  setNewArticle(state, article) {
    state.newArticle = article;
    state.articles = [article, ...state.articles];
  },
};
export const actions = {
  setArticles({ commit }, articles) {
    commit("setArticles", articles);
  },
  setNewArticle({ commit }, article) {
    commit("setNewArticle", article);
  },
};
