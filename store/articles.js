
export const state = () => ({
  articles: []
});
export const getters = {
  articles: (state) => state.articles,
};

export const mutations = {
  setArticles(state, articles) { state.articles = articles },
};
export const actions = {
  setArticles({ commit }, articles) {
    commit("setArticles", articles);
  },
};
