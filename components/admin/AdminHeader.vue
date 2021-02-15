<template>
  <header class="header_container">
    <div class="header_box flex_item admin_container">
      <div class="admin-info grid_item">
        <button class="btn_notify" @click="notifyShow = !notifyShow">
          <i class="fa fa-bell"></i>
          <span class="length"></span>
        </button>
      </div>

      <div class="notifications_container" v-show="notifyShow">
        <div class="notify_header">
          <span class="title">الاشعارات</span>
          <button class="btn_close" @click="notifyShow = false">
            <i class="fa fa-times"></i>
          </button>
        </div>

        <div class="notify_box">
          <div
            class="notify_item"
            v-for="(item, index) in notifications"
            :key="index"
          >
            <p class="content">
              {{ item.content }}
              <nuxt-link :to="'/admin/users#' + item.user.id">
                {{ item.user.name }}
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>

      <div class="welcome_box">
        <span class="welcome">{{ GetWelcomeMsg }}</span
        >,
        <span class="name">{{ username }}</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      notifyShow: false,
      notifications: [
        {
          user: {
            name: "إسلام السيد",
            id: "94KHJSD6576G45H",
          },
          content: "تم إنشاء مقالة جديدة بواسطة",
        },
      ],
    };
  },
  computed: {
    GetWelcomeMsg() {
      var myDate = new Date();
      var hrs = myDate.getHours();
      var greet;
      if (hrs < 12) greet = "صباح الخير";
      else if (hrs >= 12 && hrs <= 17) greet = "طاب مسائك";
      else if (hrs >= 17 && hrs <= 24) greet = "مساء الخير";
      return greet;
    },
    username() {
      return this.$store.getters["auth/user"]
        ? this.$store.getters["auth/user"].name
        : "";
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.header_container {
  width: 100%;
  height: 60px;
  background-color: #fff;

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
    .admin-info {
      grid-template-columns: 40px;
      gap: 5px;
      align-items: center;
      position: relative;

      .btn_notify {
        border: none;
        font-size: 20px;
        background-color: transparent;
        cursor: pointer;
        position: relative;
        .length {
          position: absolute;
          top: 0;
          right: 0;
          width: 15px;
          height: 15px;
          background-color: #eb596e;
          border-radius: 100px;
          border: 3px solid #fff;
          margin: 3px;
        }
      }
    }
    .welcome_box {
      padding: 10px 15px;
      font-size: 16px;
    }
    .notifications_container {
      position: absolute;
      top: 100%;
      width: 350px;
      background-color: #fff;
      right: 0;
      height: 500px;
      @media screen and(max-width: 480px) {
        width: 100%;
      }
      .notify_header {
        padding: 10px;
        background-color: #f2f2f2;
        line-height: 1.5;
        position: relative;
        width: 100%;
        overflow: hidden;
        .title {
          display: inline-table;
          text-overflow: ellipsis;
          -ms-text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .btn_close {
          line-height: 1.5;
          float: left;
          padding: 0 5px;
          border: none;
          background-color: transparent;
          cursor: pointer;
        }
      }
      .notify_box {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden auto;
        -webkit-overflow-scrolling: touch;
        padding: 10px;
        .notify_item {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          height: auto;
          background-color: #f7f6f6;
          display: block;
          margin: 10px auto;
          &:first-child {
            margin-top: 0;
          }
          .content {
            a {
              color: #1b5fdf;
              text-decoration: none;
              padding: 0 5px;
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
