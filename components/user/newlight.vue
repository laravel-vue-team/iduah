<template>
  <div class="new_light_container">
    <button class="btn_light" @click="OpenLightForm" ref="btnlight">
      <i class="far fa-lightbulb transition"></i>
    </button>
    <form
      class="light_form"
      ref="addLight"
      @submit.prevent="addNewLight"
      v-show="show"
    >
      <div v-if="!isAuth" class="unregister-container">
        <h2>
          قم بتسجيل الدخول للتتمكن من اضافة اضاءة جديدة
          <h5>
            <nuxt-link class="link" to="login">تسجيل الدخول</nuxt-link>
          </h5>
        </h2>
      </div>
      <div v-else>
        <p class="content">شاركنا الاجر في اضافة إضاءة جديدة</p>
        <textarea
          name="light"
          id="new_light"
          placeholder="بسم الله"
          required
          autocomplete="off"
          spellcheck="off"
          autocorrect="off"
          class="focus_elem transition"
        ></textarea>
        <button class="btn_submit" type="submit">أنشر الان</button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("ar");
export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
  },
  methods: {
    OpenLightForm() {
      const btn = this.$refs.btnlight;
      if (btn.classList.contains("active_light")) {
        btn.classList.remove("active_light");
        btn.children[0].classList.replace("fas", "far");
      } else {
        btn.classList.add("active_light");
        btn.children[0].classList.replace("far", "fas");
      }
      this.show = !this.show;
    },
    clearForm() {
      const btn = this.$refs.btnlight;
      btn.classList.remove("active_light");
      btn.children[0].classList.replace("fas", "far");
      this.show = !this.show;
      let form = this.$refs.addLight;
      form["light"].value = "";
    },
    addNewLight() {
      // const isAuth = this.$store.getters["auth/isAuth"];
      if (this.isAuth) {
        let form = this.$refs.addLight;
        let newLight = { description: form["light"].value };
        newLight = JSON.stringify(newLight);
        this.$axios
          .post("/api/lights/store", newLight)
          .then((res) => {
            this.$store.dispatch("lights/fetchLights");
            this.$router.push("/");
            this.clearForm();
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #1b5fdf;
}
.unregister-container {
  margin-bottom: 20px;
  letter-spacing: 0.6px;
}
.new_light_container {
  width: 100%;
  height: auto;
  position: relative;
  form {
    width: 100%;
    transition: opacity 0.2s;
    -webkit-transition: opacity 0.2s;
    -moz-transition: opacity 0.2s;
    -ms-transition: opacity 0.2s;
    -o-transition: opacity 0.2s;
    opacity: 1;
    .content {
      padding: 10px;
      font-size: 17px;
    }
    .btn_submit {
      padding: 7px 15px;
      border-radius: 5px;
      width: 100%;
      border: none;
      color: #fff;
      background-color: #74a2f8;
      cursor: pointer;
      display: block;
      text-align: center;
      text-align: -webkit-center;
      line-height: 1.5;
      margin: 10px auto;
    }
  }
  .btn_light {
    border: none;
    background-color: #fff;
    box-shadow: 0 0 30px #f4f4f4;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 10px;
    line-height: 1.5;
  }
  .active_light {
    background-color: #ffe22750;
    color: #fdb827;
  }
}
.focus_elem {
  width: 100%;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  display: block;
  resize: vertical;
  &:focus {
    box-shadow: 0 0 0 3px #bad2fd;
    -webkit-box-shadow: 0 0 0 3px #d2e2ff;
    border-color: #d2e2ff;
  }
}
</style>
