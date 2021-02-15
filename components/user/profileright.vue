<template>
  <div class="rightside_container">
    <div class="rightside_box">
      <h3 class="welcome_title">
        <span class="welcome_th">{{ welcome }}</span>
        <span class="name">{{ userName }}</span>
      </h3>

      <div class="buttons flex_item">
        <button
          class="btn_lights btn_profile"
          :class="{ active: dataType === 'lights' }"
          @click="dataTypeToLights"
        >
          إضاءات
        </button>
        <button
          class="btn_articles btn_profile"
          :class="{ active: dataType === 'articles' }"
          @click="dataTypeToArticles"
        >
          مقالات
        </button>
      </div>

      <table class="profile_info">
        <tbody>
          <tr>
            <td>إضاءات:</td>
            <td>
              {{ data.lights.length }}
            </td>
          </tr>
          <tr>
            <td>مقالات:</td>
            <td>
              {{ data.articles.length }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      welcome: "مرحبا",
    };
  },
  created() {
    this.$store.dispatch("auth/fetchProfileData");
  },
  computed: {
    data() {
      return this.$store.getters["auth/profileData"];
    },
    dataType() {
      return this.$store.getters["auth/dataType"];
    },
    userName() {
      return this.$store.getters["auth/user"]
        ? this.$store.getters["auth/user"].name
        : "";
    },
  },
  methods: {
    dataTypeToArticles() {
      this.$store.commit("auth/setDataType", "articles");
      this.$store.dispatch("auth/fetchProfileData");
    },
    dataTypeToLights() {
      this.$store.commit("auth/setDataType", "lights");
      this.$store.dispatch("auth/fetchProfileData");
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: #eb596e;
}
.rightside_container {
  width: 100%;
  height: auto;
  .rightside_box {
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 30px #f3f3f3;
    -webkit-box-shadow: 0 0 30px #f3f3f3;
  }
  .welcome_title {
    padding: 10px;
    font-weight: 500;
  }
  .buttons {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    -ms-flex-direction: row;
    flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    width: 100%;
    height: auto;
    position: relative;
    margin: 10px auto;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    .btn_profile {
      transition: 0.5s;
      width: 48%;
      padding: 5px 10px;
      border-radius: 100px;
      border: none;
      line-height: 1.5;
      cursor: pointer;
    }
  }
  .profile_info {
    td {
      padding: 5px 10px;
    }
  }
}
</style>
