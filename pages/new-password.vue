<template>
  <div class="container_responsive_wrapper container_hg password_container">
    <div class="password_box">
      <h3 class="title">إنشاء كملة سر جديدة</h3>

      <p class="error_content transition" v-show="requires">
        رجاءً تأكد من صحة البيانات الدخلة
      </p>

      <form
        class="password-form"
        @submit.prevent="ForgotPassword"
        ref="password"
      >
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
            minlength="8"
          />
        </div>
        <div class="form_group">
          <label for="confirm_pass">
            تأكيد كلمة السر <span class="required">*</span></label
          >
          <input
            type="password"
            name="con_pass"
            id="confirm_pass"
            placeholder="••••••••"
            required
            autocorrect="off"
            autocomplete="off"
            spellcheck="off"
            class="transition focus_elem"
            onpaste="return false"
            minlength="8"
          />
        </div>

        <div class="form_group">
          <button
            class="btn_submit trasistion"
            name="submit"
            type="submit"
            @click="CheckRequires"
          >
            ارسال
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
      requires: false,
      title: "استرجاع كلمة السر",
      desc: "استرجاع كلمة السر",
    };
  },
  // middleware: "authenticated",
  methods: {
    ForgotPassword() {
      const CurrentSubmitForm = this.$refs.password;

      const userinfo = {
        pass: CurrentSubmitForm["pass"].value,
        confirmpass: CurrentSubmitForm["con_pass"].value,
      };
      this.$router.push("/login");
    },
    CheckRequires() {
      const CurrentForm = this.$refs.password;
      const requires = CurrentForm.querySelectorAll("[required]");

      requires.forEach((require) => {
        let val = require.value;
        if (val === "") {
          return (this.requires = true), require.classList.add("empty_elem");
        } else {
          return (
            (this.requires = false), require.classList.remove("empty_elem")
          );
        }
      });
    },
  },
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
.password_container {
  position: relative;
  padding: 20px 10px;
  .password_box {
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
    }
    .password-form {
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
