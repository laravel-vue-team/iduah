<template>
  <header class="header_container">
    <div class="container_responsive_wrapper header_box flex_item">
      <div class="main_links">
        <nuxt-link to="/" class="logo_icon"> اضاءة </nuxt-link>
        <nuxt-link class="lights" to="/"> اضاءات </nuxt-link>
        <nuxt-link class="articles" to="/articles"> مقالات </nuxt-link>
      </div>
      <nav class="header_navbar_lg">
        <ul class="navber_par">
          <div
            class="no-user"
            v-show="
              !$store.getters['auth/isAuth'] &&
              !$store.getters['auth/isLoading']
            "
          >
            <li class="link_li">
              <nuxt-link to="/register">حساب جديد</nuxt-link>
            </li>
            <li class="link_li log_in">
              <nuxt-link to="/login" class="transition"
                ><i class="far fa-user"></i> تسجيل الدخول</nuxt-link
              >
            </li>
          </div>
          <div
            class="user"
            v-show="
              $store.getters['auth/isAuth'] && !$store.getters['auth/isLoading']
            "
          >
            <li class="link_li">
              <nuxt-link to="/profile">
                <span class="user_name">
                  {{
                    $store.getters["auth/user"] &&
                    $store.getters["auth/user"].name
                  }}
                </span>
                <i class="far fa-user"></i
              ></nuxt-link>
            </li>
            <li class="link_li">
              <nuxt-link to="/settings"
                ><i class="fa fa-cog"></i>الاعدادت</nuxt-link
              >
            </li>
            <li @click="logout" class="link_li logout">
              <nuxt-link to="/login">
                <i class="fas fa-sign-out-alt"></i>خروج
              </nuxt-link>
            </li>
          </div>
        </ul>
      </nav>
      <!-- MD NAV -->
      <button class="btn_nav_md" @click="NavBarActiveIt()" ref="BtnMdNav">
        <span class="menu_icon transition"></span>
      </button>

      <nav class="navbar_md transition" ref="MdNav">
        <ul class="navber_par">
          <div class="no-user" v-if="!$store.getters['auth/isAuth']">
            <li class="link_li" @click="NavBarActiveIt">
              <nuxt-link to="/register">حساب جديد</nuxt-link>
            </li>
            <li class="link_li log_in" @click="NavBarActiveIt">
              <nuxt-link to="/login" class="transition"
                ><i class="far fa-user"></i> تسجيل الدخول</nuxt-link
              >
            </li>
          </div>
          <div class="user" v-if="$store.getters['auth/isAuth']">
            <li class="link_li" @click="closeNavBar">
              <nuxt-link to="/profile">
                <span class="user_name">
                  {{
                    $store.getters["auth/user"] &&
                    $store.getters["auth/user"].name
                  }}
                </span>
                <i class="far fa-user"></i
              ></nuxt-link>
            </li>
            <li class="link_li" @click="NavBarActiveIt">
              <nuxt-link to="/settings"
                ><i class="fa fa-cog"></i>الاعدادت</nuxt-link
              >
            </li>
            <li
              class="link_li logout"
              style="color: #eb596e"
              @click="NavBarActiveIt"
            >
              <div @click="logout"><i class="fas fa-sign-out-alt"></i>خروج</div>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      if (process.client) {
        this.$axios
          .get("/api/logout")
          .then((res) => {})
          .catch((err) => {});
        this.clearUser();
        this.$router.push("/login");
      }
    },
    clearUser() {
      localStorage.clear("TOKEN");
      localStorage.clear("USER");
      this.$store.dispatch("auth/setToken", null);
      this.$store.dispatch("auth/setUser", null);
      this.$store.dispatch("articles/setArticles", []);
      this.$store.dispatch("lights/setLights", []);
      sessionStorage.clear();
    },
    NavBarActiveIt() {
      const CurrentBtn = this.$refs.BtnMdNav;
      const CurrentMdNav = this.$refs.MdNav;
      CurrentBtn.classList.toggle("btn_active");
      CurrentMdNav.classList.toggle("nav_active");
    },
    closeNavBar() {
      const CurrentBtn = this.$refs.BtnMdNav;
      const CurrentMdNav = this.$refs.MdNav;
      CurrentBtn.classList.toggle("btn_active");
      CurrentMdNav.classList.toggle("nav_active");
    },
  },
};
</script>

<style lang="scss" scoped>
.user_name {
  margin-left: 5px;
}
.header_container {
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0 30px #f3f3f3;
  -webkit-box-shadow: 0 0 30px #f3f3f3;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 2;

  .header_box {
    width: 100%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    position: relative;
    a {
      text-decoration: none;
      color: #000;
    }
    .user {
      i {
        margin-left: 5px;
        vertical-align: middle;
        font-size: 17px;
      }
      .logout {
        a {
          color: #eb596e;
        }
      }
    }
    .lights {
      margin: 0 6px 0 5px;
    }
    .logo_icon {
      margin-right: 10px;
      font-size: 18px;
      font-weight: 500;
      /* background-color: rgb(27, 95, 223, 0.9);
      border-radius: 20px;
      padding: 5px 12px !important;
      margin-left: 10px;
        filter: saturate(0.6);
      &:hover{
        filter: saturate(0.9);
      }
      color: white; */
    }
    .main_links {
      a {
        padding: 6px;
      }
    }
    .header_navbar_lg {
      @media screen and(max-width: 480px) {
        display: none;
      }
      ul {
        list-style: none;
        li {
          display: inline-block;
          margin: 0 10px;
        }
        .log_in {
          a {
            background-color: #1b5fdf;
            border-radius: 10px;
            padding: 10px 15px;
            display: block;
            color: #fff;
            font-weight: 500;
            font-size: 15px;
            &:hover {
              box-shadow: 0 0 0 3px #bad2fd;
              -webkit-box-shadow: 0 0 0 3px #bad2fd;
            }
          }
        }
      }
    }
    .btn_nav_md {
      position: relative;
      padding: 7px;
      border-radius: 10px;
      background-color: #f1f1f1;
      border: none;
      width: 35px;
      height: 35px;
      cursor: pointer;
      @media screen and(min-width: 480px) {
        display: none;
      }
      .menu_icon {
        width: 100%;
        height: 2px;
        background-color: #333;
        border-radius: 100px;
        display: block;
        position: relative;
        &::after,
        &::before {
          position: absolute;
          content: "";
          width: 50%;
          height: 2px;
          background-color: #333;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
          -moz-transform: translateX(-50%);
          -ms-transform: translateX(-50%);
          -o-transform: translateX(-50%);
          transition: 0.3s ease-in-out;
          -webkit-transition: 0.3s ease-in-out;
          -moz-transition: 0.3s ease-in-out;
          -ms-transition: 0.3s ease-in-out;
          -o-transition: 0.3s ease-in-out;
        }
        &::after {
          top: -6px;
        }
        &::before {
          top: 6px;
        }
      }
    }
    .btn_active {
      .menu_icon {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        &::after {
          transform: rotate(90deg) translate(0.5px, 5px);
          -webkit-transform: rotate(90deg) translate(0.5px, 5px);
          -moz-transform: rotate(90deg) translate(0.5px, 5px);
          -ms-transform: rotate(90deg) translate(0.5px, 5px);
          -o-transform: rotate(90deg) translate(0.5px, 5px);
        }
        &::before {
          transform: rotate(90deg) translate(-1px, 5px);
          -webkit-transform: rotate(90deg) translate(-1px, 5px);
          -moz-transform: rotate(90deg) translate(-1px, 5px);
          -ms-transform: rotate(90deg) translate(-1px, 5px);
          -o-transform: rotate(90deg) translate(-1px, 5px);
        }
      }
    }
    .navbar_md {
      position: absolute;
      top: 100%;
      width: 100%;
      background-color: #fff;
      padding: 10px;
      right: 0;
      text-align: center;
      text-align: -webkit-center;
      opacity: 0;
      top: -100%;
      visibility: hidden;
      pointer-events: none;
      @media screen and(min-width: 480px) {
        display: none;
      }
      ul {
        width: 100%;
      }
      li {
        list-style: none;
        margin-bottom: 10px;
        width: 100%;
      }
    }
    .nav_active {
      top: 100% !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: all !important;
    }
  }
}
</style>
