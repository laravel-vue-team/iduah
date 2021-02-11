<template>
  <div class="rightside_container">
    <div class="rightside_box">
      <h3 class="welcome_title">
        <span class="welcome_th">{{ welcome }}</span>
        <span class="name">{{ username }}</span>
      </h3>

      <div class="buttons flex_item">
        <button class="btn_lights btn_profile">إضاءات</button>
        <button class="btn_articles btn_profile">مقالات</button>
      </div>

      <table class="profile_info">
        <tbody>
          <tr>
            <td>إضاءات:</td>
            <td>10</td>
          </tr>
          <tr>
            <td>مقالات:</td>
            <td>10</td>
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
      username: this.$store.getters["auth/user"]
        ? this.$store.getters["auth/user"].name
        : "",
    };
  },
};
</script>

<style lang="scss" scoped>
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
