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
      v-show="articles.length === 0"
      class="spinner"
      style="position: absolute"
    >
      <spinner />
    </div>
    <article
      class="article_box"
      v-for="(item, index) in articles"
      :key="item.id"
      :data-index="item.id"
      :data-arr-index="index"
      :data-id="item.id"
    >
      <p
        class="article_title"
        @click="goToArticlePage({ id: item.id, index, title: item.title })"
      >
        {{ item.title }}
      </p>
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
            {{ createTime(item.created_at) }}
          </span>
          |
          <span class="center">
            <i class="fa fa-layer-group"></i>
            {{ item.category && item.category.title }}
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
          @click="HeartIt(item.id, index)"
          v-bind:class="{
            hearted: item.likes.some((data) => data.id === getUserId()),
          }"
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

        <div class="btn_share" tabindex="-1" @click="Clickme(item.id)">
          <i class="fa fa-share"></i>

          <div class="share_box transition">
            <ul class="share_socials">
              <li class="share_li">
                <div
                  class="fb-share-button"
                  :data-href="encodeURI(loc.origin + '/article?id=' + item.id)"
                  data-layout="button"
                  data-size="small"
                >
                  <a
                    :href="
                      'https://www.facebook.com/sharer.php?u=' +
                      encodeURI(loc.origin + '/article?id=' + item.id) +
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
                      `https://twitter.com/intent/tweet?url=${loc.origin}/article?id=${item.id}&text=${item.title}`
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
                      `https://wa.me/?text=${item.title} ${loc.origin}/article?id=${item.id}&text=${item.title}, ${loc.origin}/article?id=${item.id}`
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
    <div v-show="isLoading && articles.length !== 0" class="spinner">
      <spinner />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import spinner from "./spinner.vue";
moment.locale("ar");
export default {
  components: { spinner },
  data() {
    return {
      classname: "",
      loc: "",
    };
  },
  computed: {
    articles() {
      const isAuth = this.$store.getters["auth/isAuth"];
      if (process.client && isAuth) {
        this.addLisenters(this);
      }
      return this.$store.getters["articles/articles"];
    },
    isLoading() {
      return this.$store.getters["articles/isLoading"];
    },
    isThereNextPage() {
      return this.$store.getters["articles/isThereNextPage"];
    },
    currentPage() {
      return this.$store.getters["articles/currentPage"];
    },
  },
  created() {
    this.$store.dispatch("articles/fetchArticles");
    if (process.browser) {
      this.loc = window.location;
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(e, _this = this) {
      const pageHeight = document.body.offsetHeight;
      const scrollValue = window.scrollY;
      // let percent = scrollValue / (pageHeight - pageHeight * 0.3);
      // let enoughScroll =
      //   pageHeight < 5000 ? percent > 0.6 : pageHeight - scrollValue < 1200;
      let enoughScroll = pageHeight - scrollValue < 1100;
      if (enoughScroll && _this.isThereNextPage && !_this.isLoading) {
        this.$store.commit("articles/setIsLoading", true);
        _this.$axios
          .get(`/api/posts?page=${_this.currentPage + 1}`)
          .then((res) => {
            _this.$store.dispatch("articles/addArticles", res.data.data);
            this.$store.commit("articles/setIsLoading", false);
          })
          .catch((err) => {
            this.$store.commit("articles/setIsLoading", false);
          });
      }
    },
    goToArticlePage(obj) {
      this.$store.commit(
        "articles/setCurrentArticle",
        this.articles[obj.index]
      );
      this.$router.push("/article?id=" + obj.id);
    },
    addLisenters(_this) {
      let observer = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              const targetId = entry.target.getAttribute("data-id");
              const targetIndex = entry.target.getAttribute("data-arr-index");
              _this.$axios
                .get(`/api/posts/${targetId}/view`, { progress: false })
                .then((res) => {
                  if (res.data.message !== "view alredy exists") {
                    _this.articles[targetIndex].views.push({});
                  }
                })
                .catch((err) => {});
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
    createTime(timeStmp) {
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
    beforeDestroy() {
      document.removeEventListener("click", this.closeBox);
    },
    HeartIt(id, index) {
      const btnHeart = document.querySelector(
        `.article_box[data-index='${id}'] .btn_heart`
      );
      const icon = btnHeart.querySelector(".fa-heart");
      btnHeart.classList.toggle("hearted");
      this.$axios
        .get(`/api/posts/${id}/like`)
        .then((res) => {
          if (btnHeart.classList.contains("hearted")) {
            icon.classList.replace("far", "fas");
            this.articles[index].likes.push({});
          } else {
            icon.classList.replace("fas", "far");
            this.articles[index].likes.pop();
          }
          //     box-shadow: 0 0 0 3px #bad2fd;
        })
        .catch((err) => {
          btnHeart.classList.toggle("hearted");
        });
    },
  },
  name: "articlecontent",
};
</script>

<style lang="scss" scoped>
.spinner {
  width: 100%;
  margin: 10vh 0;
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
    .article_title {
      cursor: pointer;
      padding: 10px;
      font-size: 24px;
      text-overflow: ellipsis;
      -ms-text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      -webkit-overflow-scrolling: touch;
      color: #1b5fdf;
    }
    .article_header {
      padding: 5px 10px 10px 10px;
      margin-bottom: 10px;
      span {
        padding: 0 5px;
        font-size: 14px;
        position: relative;
        i {
          padding-left: 5px;
        }
      }
      .center {
        color: #1687a7;
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
