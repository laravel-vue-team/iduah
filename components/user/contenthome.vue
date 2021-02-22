<template>
  <div class="articles_container flex_item">
    <!-- <div id="fb-root"></div>
    <script
      async
      defer
      crossorigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
      nonce="TO1sdJNB"
    ></script> -->
    <div
      v-show="lights.length === 0"
      class="spinner"
      style="position: absolute"
    >
      <spinner />
    </div>
    <article
      v-show="lights.length !== 0"
      class="article_box"
      v-for="(item, index) in lights"
      :key="item.id"
      :data-index="item.id"
      :data-id="item.id"
      :data-arr-index="index"
      @click="goToLightPage({ id: item.id, index, title: item.title })"
    >
      <!-- article header -->
      <div class="article_header">
        <p class="header_content">
          <span class="name">
            <i class="far fa-user"></i>
            {{ item.user.name }}
          </span>
          |
          <span class="date">
            <i class="far fa-clock"></i>
            {{ timeFromNow(item.created_at) }}
          </span>
        </p>
      </div>

      <!-- article content -->

      <div class="artcile_content">
        <p class="content">
          {{ item.description }}
        </p>
      </div>

      <!-- article controls  -->
      <div class="article_controls">
        <button
          class="btn_heart transition"
          v-bind:class="{
            hearted: item.likes.some((data) => data.id === getUserId()),
          }"
          @click="HeartIt(item.id)"
        >
          <span class="length">{{ item.likes.length }}</span>
          <i
            class="fa-heart transition"
            v-bind:class="{
              fas: item.likes.some((data) => data.id === getUserId()),
              far: item.likes.every((data) => data.id !== getUserId()),
            }"
          ></i>
        </button>

        <div class="view">
          <span class="length">{{ item.views.length }}</span>
          <i class="far fa-eye"></i>
        </div>

        <div class="btn_share" @click="Clickme(item.id)">
          <i class="fa fa-share"></i>

          <div class="share_box transition">
            <ul class="share_socials">
              <li class="share_li">
                <div
                  class="fb-share-button"
                  :data-href="encodeURI(loc.origin + '/light?id=' + item.id)"
                  data-layout="button"
                  data-size="small"
                >
                  <a
                    :href="
                      'https://www.facebook.com/sharer/sharer.php?u=' +
                      encodeURI(loc.origin + '/light?id=' + item.id) +
                      '&amp;src=sdkpreparse'
                    "
                    class="social_icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-facebook"></i>
                  </a>
                </div>
              </li>
              <li class="share_li">
                <a
                  :href="
                    encodeURI(
                      `https://twitter.com/intent/tweet?url=${loc.origin}/light?id=${item.id}&text=${item.description}`
                    )
                  "
                  class="social_icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li class="share_li">
                <a
                  :href="
                    encodeURI(
                      `https://wa.me/?text=${item.description} ${loc.origin}/light?id=${item.id}&text=${item.description}, ${loc.origin}/light?id=${item.id}`
                    )
                  "
                  class="social_icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-whatsapp"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </article>
    <!-- <button
      v-if="lights.length !== 0"
      class="add-lights-btn"
      @click="addLights"
      :disabled="isLoading || !isThereNextPage"
    >
      {{
        isLoading
          ? "جاري التحميل..."
          : !isThereNextPage
          ? "انتهت الاضاءات"
          : "المزيد من الاضاءات"
      }}
    </button> -->
    <div v-show="isLoading && lights.length !== 0" class="spinner">
      <spinner />
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("ar");
export default {
  data() {
    return {
      classname: "",
      loc: "",
    };
  },
  mounted() {
    if (process.browser) {
      this.loc = window.location;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // edit: 2
  },
  computed: {
    lights() {
      const isAuth = this.$store.getters["auth/isAuth"];
      if (process.client && isAuth) {
        this.addLisenters(this);
      }
      return this.$store.getters["lights/lights"];
    },
    isThereNextPage() {
      return this.$store.getters["lights/isThereNextPage"];
    },
    currentPage() {
      return this.$store.getters["lights/currentPage"];
    },
    isLoading() {
      return this.$store.getters["lights/isLoading"];
    },
    isPageLoading() {
      return this.$store.getters["auth/isLoading"];
    },
  },
  created() {
    this.$store.dispatch("lights/fetchLights");
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll); // edit: 1
    }
  },
  methods: {
    // addLights() {
    //   if (this.isThereNextPage && !this.isLoading) {
    //     this.$store.commit("lights/setIsLoading", true);
    //     this.$axios
    //       .get(`/public/api/lights?page=${this.currentPage + 1}`)
    //       .then((res) => {
    //         this.$store.commit("lights/setIsLoading", false);
    //         this.$store.dispatch("lights/addLights", res.data.data);
    //       })
    //       .catch((err) => {
    //         this.$store.commit("lights/setIsLoading", false);
    //       });
    //   }
    // },
    goToLightPage(obj) {
      this.$store.commit("lights/setCurrentLight", this.lights[obj.index]);
      this.$router.push("/light?id=" + obj.id);
    },
    handleScroll(e, _this = this) {
      const pageHeight = document.body.offsetHeight;
      const scrollValue = window.scrollY;
      // let percent = scrollValue / (pageHeight - pageHeight * 0.3);
      // let enoughScroll =
      //   pageHeight < 5000 ? percent > 0.6 : pageHeight - scrollValue < 1200;
      let enoughScroll = pageHeight - scrollValue < 1100;
      if (enoughScroll && _this.isThereNextPage && !_this.isLoading) {
        this.$store.commit("lights/setIsLoading", true);
        _this.$axios
          .get(`/public/api/lights?page=${_this.currentPage + 1}`)
          .then((res) => {
            this.$store.commit("lights/setIsLoading", false);
            this.$store.dispatch("lights/addLights", res.data.data);
          })
          .catch((err) => {
            this.$store.commit("lights/setIsLoading", false);
          });
      }
    },
    addLisenters(_this) {
      let observer = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              const targetId = entry.target.getAttribute("data-id");
              const targetIndex = entry.target.getAttribute("data-arr-index");
              let lights = _this.$store.getters["lights/lights"];
              let user = _this.$store.getters["auth/user"];
              let isUserViewed = lights[targetIndex].views.some(
                (view) => view.id === user.id
              );
              if (!isUserViewed) {
                _this.$axios
                  .get(`/api/lights/${targetId}/view`, { progress: false })
                  .then((res) => {
                    if (res.data.message !== "view alredy exists") {
                      this.$store.commit("lights/viewLight", targetIndex);
                    }
                  })
                  .catch((err) => {});
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: [1] }
      );
      document.querySelectorAll(".article_box").forEach((article) => {
        observer.observe(article);
      });
    },
    getUserId() {
      let userId = this.$store.getters["auth/user"]
        ? this.$store.getters["auth/user"].id
        : -1;
      return userId;
    },
    timeFromNow(timeStmp) {
      return moment(timeStmp).fromNow();
    },
    Clickme(id) {
      const shareBox = document.querySelector(
        `.article_box[data-index='${id}'] .share_box`
      );
      const shareBoxes = document.querySelectorAll(".share_box");
      shareBoxes.forEach(
        (box) => box !== shareBox && box.classList.remove("share_opened")
      );
      shareBox.classList.toggle("share_opened");
    },
    focused() {
      console.log("focused");
    },
    HeartIt(id) {
      const btnHeart = document.querySelector(
        `.article_box[data-index='${id}'] .btn_heart`
      );
      const icon = btnHeart.querySelector(".fa-heart");
      btnHeart.classList.toggle("hearted");
      this.$axios
        .get(`/api/lights/${id}/like`)
        .then((res) => {
          if (btnHeart.classList.contains("hearted")) {
            icon.classList.replace("far", "fas");
            this.$store.commit("lights/addLike", id);
          } else {
            icon.classList.replace("fas", "far");
            this.$store.commit("lights/removeLike", id);
          }
        })
        .catch((err) => {
          btnHeart.classList.toggle("hearted");
        });
    },
  },
  name: "contenthome",
};
</script>

<style lang="scss" scoped>
.spinner {
  width: 100%;
  margin: 10vh 0;
}
.add-lights-btn {
  padding: 4px 15px;
  border-radius: 5px;
  width: 100%;
  max-width: 340px;
  border: none;
  color: #fff;
  background-color: #eb596e;
  display: block;
  text-align: center;
  cursor: pointer;
  margin: 40px auto 20px;
  letter-spacing: 0.6px;
  font-size: 18px;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 0 3px rgb(235 89 110 / 40%);
  }
  &:disabled {
    opacity: 0.5;
    cursor: auto;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
}
.articles_container {
  margin-bottom: 50px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  -ms-flex-direction: column;
  flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  width: 100%;
  height: auto;
  position: relative;
  padding: 0 10px;
  .article_box {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    margin: 10px auto;
    box-shadow: 0 0 30px #f3f3f3;
    .article_header {
      padding: 10px 0;
      margin-bottom: 10px;
      span {
        padding: 0 5px;
        font-size: 14px;
        position: relative;
        i {
          padding-left: 5px;
        }
      }
    }
    .artcile_content {
      padding: 10px;
      border-radius: 5px;
      background-color: #fbfbfb;
      position: relative;
      .content {
        line-height: 1.7;
        font-size: 18px;
      }
    }
    .article_controls {
      padding: 10px;
      position: relative;
      .btn_heart {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: transparent;
        border: 1px solid #ddd;
        cursor: pointer;
        line-height: 1;
        i {
          padding-right: 3px;
        }
      }
      .hearted {
        background-color: #eb596e30;
        border-color: #eb596e40 !important;
        .fas {
          color: #eb596e;
        }
      }
      .view {
        display: inline-block;
        margin: 0 10px;
        padding: 5px 10px;
        i {
          vertical-align: middle;
        }
      }
      .btn_share {
        &:hover {
          box-shadow: 0 0 0 3px #bad2fd;
          background-color: rgb(27, 95, 223, 0.9);
        }
        transition: 0.2s;
        float: left;
        padding: 5px 10px;
        font-size: 16px;
        background-color: #74a2f8;
        color: #fff;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        position: relative;
        .share_opened {
          bottom: calc(100% + 5px) !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: all !important;
        }
        .share_box {
          width: 36px;
          left: 0px;
          border: 1px solid #e1e1e1;
          position: absolute;
          height: auto;
          padding: 5px;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 0 10px #f3f3f3;
          z-index: 1;
          bottom: 0;
          visibility: hidden;
          opacity: 0;
          pointer-events: none;

          li {
            list-style: none;
            display: block;
            margin: 3px auto;
            text-align: center;
            text-align: -webkit-center;
          }
          a {
            text-decoration: none;
            font-size: 20px;
            .fa-facebook {
              color: #4267b2;
            }
            .fa-twitter {
              color: #1da1f2;
            }
            .fa-whatsapp {
              color: #25d366;
            }
          }
        }
      }
      .clear {
        clear: both;
      }
    }
  }
}
</style>
