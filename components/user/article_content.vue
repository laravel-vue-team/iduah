<template>
  <div class="articles_container flex_item">
    <div id="fb-root"></div>
    <script
      async
      defer
      crossorigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
      nonce="TO1sdJNB"
    ></script>
    <svg
      v-if="articles.length === 0"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style="margin: 20vh auto 0; display: block"
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="translate(50,50)">
        <g transform="scale(0.8)">
          <g transform="translate(-50,-50)">
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="360 50 50;240 50 50;120 50 50;0 50 50"
                keyTimes="0;0.333;0.667;1"
                dur="1s"
                keySplines="0.7 0 0.3 1;0.7 0 0.3 1;0.7 0 0.3 1"
                calcMode="spline"
              ></animateTransform>
              <path
                fill="#1b5fdf"
                d="M54.3,28.1h34.2c-4.5-9.3-12.4-16.7-21.9-20.8L45.7,28.1L54.3,28.1L54.3,28.1z"
              ></path>
              <path
                fill="#eb596e"
                d="M61.7,7.3C51.9,4,41.1,4.2,31.5,8.1v29.5l6.1-6.1L61.7,7.3C61.7,7.3,61.7,7.3,61.7,7.3z"
              ></path>
              <path
                fill="#222831"
                d="M28.1,11.6c-9.3,4.5-16.7,12.4-20.8,21.9l20.8,20.8v-8.6L28.1,11.6C28.1,11.6,28.1,11.6,28.1,11.6z"
              ></path>
              <path
                fill="#74a2f8"
                d="M31.5,62.4L7.3,38.3c0,0,0,0,0,0C4,48.1,4.2,58.9,8.1,68.5h29.5L31.5,62.4z"
              ></path>
              <path
                fill="#1b5fdf"
                d="M45.7,71.9H11.5c0,0,0,0,0,0c4.5,9.3,12.4,16.7,21.9,20.8l20.8-20.8H45.7z"
              ></path>
              <path
                fill="#eb596e"
                d="M62.4,68.5L38.3,92.6c0,0,0,0,0,0c9.8,3.4,20.6,3.1,30.2-0.8V62.4L62.4,68.5z"
              ></path>
              <path
                fill="#222831"
                d="M71.9,45.7v8.6v34.2c0,0,0,0,0,0c9.3-4.5,16.7-12.4,20.8-21.9L71.9,45.7z"
              ></path>
              <path
                fill="#74a2f8"
                d="M91.9,31.5C91.9,31.5,91.9,31.5,91.9,31.5l-29.5,0l0,0l6.1,6.1l24.1,24.1c0,0,0,0,0,0 C96,51.9,95.8,41.1,91.9,31.5z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
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

        <div class="btn_share" @click="Clickme(item.id)">
          <i class="fa fa-share"></i>

          <div class="share_box transition">
            <ul class="share_socials">
              <li class="share_li">
                <div
                  class="fb-share-button"
                  :data-href="
                    encodeURI(loc.origin + '/article_page/' + item.id)
                  "
                  data-layout="button"
                  data-size="small"
                >
                  <a
                    :href="
                      'https://www.facebook.com/sharer.php?u=' +
                      encodeURI(loc.origin + '/article_page/' + item.id) +
                      '%2F&amp;src=sdkpreparse'
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
                      `https://twitter.com/intent/tweet?url=${loc.origin}/article_page/${item.id}&text=${item.description}`
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
                      `https://wa.me/?text=${item.description} ${loc.origin}/article_page/${item.id}&text=${item.description}, ${loc.origin}/article_page/${item.id}`
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
    <svg
      v-if="isLoading && articles.length !== 0"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style="margin: 7vh auto; display: block"
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="translate(50,50)">
        <g transform="scale(0.8)">
          <g transform="translate(-50,-50)">
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="360 50 50;240 50 50;120 50 50;0 50 50"
                keyTimes="0;0.333;0.667;1"
                dur="1s"
                keySplines="0.7 0 0.3 1;0.7 0 0.3 1;0.7 0 0.3 1"
                calcMode="spline"
              ></animateTransform>
              <path
                fill="#1b5fdf"
                d="M54.3,28.1h34.2c-4.5-9.3-12.4-16.7-21.9-20.8L45.7,28.1L54.3,28.1L54.3,28.1z"
              ></path>
              <path
                fill="#eb596e"
                d="M61.7,7.3C51.9,4,41.1,4.2,31.5,8.1v29.5l6.1-6.1L61.7,7.3C61.7,7.3,61.7,7.3,61.7,7.3z"
              ></path>
              <path
                fill="#222831"
                d="M28.1,11.6c-9.3,4.5-16.7,12.4-20.8,21.9l20.8,20.8v-8.6L28.1,11.6C28.1,11.6,28.1,11.6,28.1,11.6z"
              ></path>
              <path
                fill="#74a2f8"
                d="M31.5,62.4L7.3,38.3c0,0,0,0,0,0C4,48.1,4.2,58.9,8.1,68.5h29.5L31.5,62.4z"
              ></path>
              <path
                fill="#1b5fdf"
                d="M45.7,71.9H11.5c0,0,0,0,0,0c4.5,9.3,12.4,16.7,21.9,20.8l20.8-20.8H45.7z"
              ></path>
              <path
                fill="#eb596e"
                d="M62.4,68.5L38.3,92.6c0,0,0,0,0,0c9.8,3.4,20.6,3.1,30.2-0.8V62.4L62.4,68.5z"
              ></path>
              <path
                fill="#222831"
                d="M71.9,45.7v8.6v34.2c0,0,0,0,0,0c9.3-4.5,16.7-12.4,20.8-21.9L71.9,45.7z"
              ></path>
              <path
                fill="#74a2f8"
                d="M91.9,31.5C91.9,31.5,91.9,31.5,91.9,31.5l-29.5,0l0,0l6.1,6.1l24.1,24.1c0,0,0,0,0,0 C96,51.9,95.8,41.1,91.9,31.5z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
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
      isLoading: false,
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
      let percent = scrollValue / (pageHeight - pageHeight * 0.3);
      let enoughScroll =
        pageHeight < 5000 ? percent > 0.6 : pageHeight - scrollValue < 1200;
      if (enoughScroll && _this.isThereNextPage && !_this.isLoading) {
        _this.isLoading = true;
        _this.$axios
          .get(`/api/posts?page=${_this.currentPage + 1}`)
          .then((res) => {
            let newArticles = [..._this.articles, ...res.data.data.data];
            _this.articles = [...newArticles];
            _this.$store.dispatch("articles/setArticles", newArticles);
            _this.isLoading = false;
            _this.currentPage = res.data.data.current_page;
            _this.isThereNextPage = res.data.data.next_page_url ? true : false;
          })
          .catch((err) => {
            console.log(err.response);
            _this.isLoading = false;
          });
      }
    },
    goToArticlePage(obj) {
      this.$store.commit(
        "articles/setCurrentArticle",
        this.articles[obj.index]
      );
      this.$router.push("/article_page/" + obj.id + "/" + obj.title);
      this.$axios
        .get(`/api/posts/${obj.id}/view`)
        .then((res) => {
          if (res.data.message !== "view alredy exists") {
            this.articles[targetIndex].views.push({});
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addLisenters(_this) {
      let observer = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              const targetId = entry.target.getAttribute("data-id");
              const targetIndex = entry.target.getAttribute("data-arr-index");
              _this.$axios
                .get(`/api/posts/${targetId}/view`)
                .then((res) => {
                  if (res.data.message !== "view alredy exists") {
                    _this.articles[targetIndex].views.push({});
                  }
                })
                .catch((err) => {
                  console.log(err.response);
                });
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

      shareBox.classList.toggle("share_opened");
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
        })
        .catch((err) => {
          btnHeart.classList.toggle("hearted");
          console.log(err.response);
        });
    },
  },
  name: "articlecontent",
};
</script>

<style lang="scss" scoped>
.articles_container {
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
          position: absolute;
          width: 50px;
          height: auto;
          padding: 5px;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 0 10px #f3f3f3;
          left: 0;
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
