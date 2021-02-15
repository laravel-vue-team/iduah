
export const state = () => ({
  token: null,
  user: null,
  isLoading: true,
  profileData: {
    lights: [],
    articles: []
  },
  currentPage: null,
  dataType: "articles",
  isThereNextPage: null,
});
export const getters = {
  isAuth: (state) => state.token !== null,
  isLoading: (state) => state.isLoading,
  token: (state) => state.token,
  profileData: (state) => state.profileData,
  dataType: (state) => state.dataType,
  user: (state) => state.user,
  currentPage: (state) => state.currentPage,
  isThereNextPage: (state) => state.isThereNextPage,
};

export const mutations = {
  setToken(state, token) { state.token = token },
  setIsLoading(state, isLoading) { state.isLoading = isLoading },
  setUser(state, user) { state.user = user },
  setProfileData(state, profileData) { state.profileData = profileData },
  setArticles(state, articles) { state.profileData = { ...state.profileData, articles } },
  setLights(state, lights) { state.profileData = { ...state.profileData, lights } },
  setDataType(state, dataType) { state.dataType = dataType },
  setCurrentPage(state, currentPage) { state.currentPage = currentPage },
  setIsThereNextPage(state, isThereNextPage) { state.isThereNextPage = isThereNextPage },
  addLightLike(state, lightId) {
    state.profileData.lights.forEach((light) => {
      if (light.id === lightId) {
        light.likes.push({});
      }
    });
  },
  removeLightLike(state, lightId) {
    console.log("like removed");
    state.profileData.lights.forEach((light) => {
      if (light.id === lightId) {
        light.likes.pop();
      }
    });
  },
  addArticleLike(state, articleId) {
    state.profileData.articles.forEach((article) => {
      if (article.id === articleId) {
        article.likes.push({});
      }
    });
  },
  removeArticleLike(state, articleId) {
    state.profileData.articles.forEach((article) => {
      if (article.id === articleId) {
        article.likes.pop();
      }
    });
  }
};
// access them using dispatch
export const actions = {
  fetchProfileData({ commit }) {
    this.$axios
      .get("/api/user")
      .then((res) => {
        commit("setLights", res.data.ligts);
        commit("setArticles", res.data.posts);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  async delete({ commit, state }, obj) {
    try {
      let res = await this.$axios.delete(`/api/${state.dataType === "articles" ? "posts" : "lights"}/${obj.id}/delete`);
      let arr = [...state.profileData[state.dataType]];
      arr.splice(obj.index, 1);
      commit(`set${state.dataType === "articles" ? "Articles" : "Lights"}`, arr);
    } catch (e) {
      console.log(e.response);
    }
  }

};
