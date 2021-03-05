<template>
  <div class="container_responsive_wrapper container_hg loging_container">
    <div class="log_box">
      <h3 class="title">تسجيل الدخول</h3>

      <p class="error_content transition" v-show="requires">
        {{ errorMessage ? errorMessage : "" }}
      </p>

      <form class="log-form" @submit.prevent="loginUser" ref="loging">
        <div class="form_group">
          <label for="email">
            البريد الالكتروني <span class="required">*</span></label
          >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            autocomplete="off"
            autocorrect="off"
            spellcheck="off"
            required
            class="transition focus_elem"
          />
        </div>
        <div class="form_group">
          <label for="pass">كلمة السر <span class="required">*</span></label>
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="••••••••"
            required
            autocorrect="off"
            autocomplete="off"
            spellcheck="off"
            class="transition focus_elem"
          />
        </div>

        <div class="form_group">
          <label for="check" class="checkbox">
            <input
              type="checkbox"
              name="rememeber"
              id="check"
              class="transition focus_elem"
              v-model="rememberMe"
            />
            تذكرني
          </label>
        </div>
        <div class="form_group">
          <nuxt-link to="/forgot_password">نسيت كلمة السر</nuxt-link>
        </div>

        <div class="form_group">
          <button
            class="btn_submit trasistion"
            name="submit"
            type="submit"
            @click="CheckRequires"
            ref="btnSubmit"
          >
            دخول
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rememberMe: false,
      requires: false,
      errorMessage: "",
      title: "تسجيل الدخول",
      desc: "قم بتسجيل الدخول الان واستكمل مهمتك في مشاركة المقالات الدينية",
    };
  },
  methods: {
    loginUser() {
      const CurrentSubmitForm = this.$refs.loging;
      const submitButton = this.$refs.btnSubmit;
      submitButton.disabled = true;
      submitButton.innerText = "تسجيل الدخول...";
      const userinfo = {
        email: CurrentSubmitForm["email"].value,
        password: CurrentSubmitForm["pass"].value,
      };
      const data = JSON.stringify(userinfo);
      this.$axios
        .post("/api/login", data)
        .then((res) => {
          this.$router.push("/profile");
          const { token, user } = res.data.data;
          let userData = JSON.stringify(user);
          if (this.rememberMe) {
            localStorage.setItem("USER", userData);
            localStorage.setItem("TOKEN", token);
          } else {
            sessionStorage.setItem("USER", userData);
            sessionStorage.setItem("TOKEN", token);
          }
          this.$store.dispatch("auth/setUser", user);
          this.$store.dispatch("auth/setToken", token);
          submitButton.innerText = "دخول";
          submitButton.disabled = false;
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
          this.requires = true;
          localStorage.removeItem("TOKEN");
          submitButton.innerText = "دخول";
          submitButton.disabled = false;
        });
    },
    CheckRequires() {
      const CurrentForm = this.$refs.loging;
      const requires = CurrentForm.querySelectorAll("[required]");
      requires.forEach((require) => {
        let val = require.value;
        if (val === "") {
          this.errorMessage = "تأكد من ادخال جميع البيانات";
          return (this.requires = true), require.classList.add("empty_elem");
        } else {
          return (
            // (this.requires = false),
            require.classList.remove("empty_elem"), !this.errorMessage
          );
        }
      });
    },
  },
  // else if (
  //   require.getAttribute("type") === "email" &&
  //   val.indexOf(".") === -1
  // ) {
  //   this.errorMessage = "ادخل البيانات بشكل صحيح";
  //   return require.classList.add("empty_elem"), (this.requires = true);
  // } else if (require.getAttribute("type") === "email") {
  //   return require.classList.remove("empty_elem");
  // }
  //seo tags to this page Home page
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.desc,
        },
      ],
    };
  },
  name: "login",
};
</script>

<style lang="scss" scoped>
.loging_container {
  position: relative;
  padding: 20px 10px;
  .log_box {
    padding: 10px;
    border-radius: 10px;
    position: relative;
    display: block;
    margin: auto;
    max-width: 600px;
    height: auto;
    background-color: #fff;
    box-shadow: 0 0 30px #f3f3f3;
    .title {
      text-align: center;
      text-align: -webkit-center;
      font-weight: 400;
      padding: 5px 10px;
      margin-bottom: 10px;
    }
    .error_content {
      color: #eb596e;
      padding: 0 10px 10px 5px;
      text-align: center;
      text-align: -webkit-center;
      font-size: 17px;
      display: table;
      margin: 0 auto;
      background: rgb(182, 182, 182, 0.4);
      border-radius: 10px;
      padding: 8px 18px;
    }
    .log-form {
      width: 100%;
      position: relative;
      .form_group {
        display: block;
        margin-bottom: 10px;
        width: 100%;
        input {
          height: 40px;
        }
        .checkbox {
          input {
            height: auto;
            position: relative;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            border-radius: 5px;
            border: 1.5px solid #ddd;
            width: 15px;
            height: 15px;
            padding: 0;
            display: inline-block;
            margin-left: 5px;
            &:checked {
              border: 5px solid #3176f7;
              border-radius: 100px;
            }
          }
        }
        label {
          display: block;
          margin-bottom: 10px;
          span {
            color: #eb596e;
            font-size: 20px;
            font-weight: 600;
          }
        }
        .focus_elem {
          width: 100%;
          padding: 10px 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          background-color: #fff;
          display: block;
          &:focus {
            box-shadow: 0 0 0 3px #bad2fd;
            -webkit-box-shadow: 0 0 0 3px #d2e2ff;
            border-color: #d2e2ff;
          }
        }
        .empty_elem {
          background-color: #eb596e50;
          border-color: #eb596e60;
          &:focus {
            box-shadow: 0 0 0 3px #eb596e60;
            -webkit-box-shadow: 0 0 0 3px #eb596e60;
            border-color: #eb596e60;
          }
        }
        a {
          color: #1b5fdf;
          text-decoration: none;
        }
        .btn_submit {
          position: relative;
          padding: 5px 15px;
          background-color: #1b5fdf;
          border-radius: 5px;
          border: none;
          color: #fff;
          cursor: pointer;
          &:disabled {
            opacity: 0.5;
            cursor: no-drop;
          }
        }
      }
    }
  }
}
</style>
