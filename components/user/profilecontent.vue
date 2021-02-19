<template>
  <div class="articles_container">
    <!-- <div id="fb-root"></div>
    <script
      async
      defer
      crossorigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
      nonce="TO1sdJNB"
    ></script> -->
    <spinner v-if="isLoading" />
    <div v-else>
      <div class="articles_box grid_item">
        <article
          class="article_box"
          v-for="(item, index) in dataType === 'articles'
            ? data.articles
            : data.lights"
          :key="item.id"
          :data-index="item.id"
        >
          <p class="article_title" v-if="item.type === 'article'">
            {{ item.title }}
          </p>
          <div class="article_header">
            <p class="header_content">
              <span class="name">
                <i class="far fa-user"></i>
                {{ item.user && item.user.name }}
              </span>
              |
              <span class="date">
                <i class="far fa-clock"></i>
                {{ getTime(item.created_at) }}
              </span>
              <span class="line" v-if="item.type === 'article'">|</span>
              <!-- <span class="center" v-if="item.type === 'article'">
              <i class="fa fa-layer-group"></i>
              {{ item.description }}
            </span> -->
            </p>
          </div>

          <!-- article content -->

          <div class="artcile_content">
            <p class="content">
              {{
                item.description.length >= 200
                  ? item.description.slice(0, 200) + "..."
                  : item.description
              }}
            </p>
          </div>

          <!-- article controls  -->
          <div class="article_controls">
            <button
              class="btn_heart transition"
              @click="HeartIt(item.id)"
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
                        encodeURI(loc.origin + '/article?id=' + item.id)
                      "
                      data-layout="button"
                      data-size="small"
                    >
                      <a
                        :href="
                          'https://www.facebook.com/sharer/sharer.php?u=' +
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

            <button
              class="btn_delete"
              @click="DeleteMe({ id: item.id, index })"
            >
              <i class="far fa-trash-alt"></i>
            </button>

            <div class="clear"></div>
          </div>
        </article>
      </div>

      <div
        class="empty"
        v-show="
          dataType === 'articles'
            ? data.articles.length == 0
            : data.lights.length == 0
        "
      >
        <img src="~/assets/img/empty.svg" alt="empty image" />
        <p class="content">ليس هناك العديد من المقالات او الإضاءات لعرضه</p>
      </div>
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
      isLoading: true,
    };
  },
  created() {
    let isAuth = this.$store.getters["auth/isAuth"];
    if (isAuth) this.$store.dispatch("auth/fetchProfileData");
    if (process.browser) {
      return (this.loc = window.location);
    }
  },
  watch: {
    isUser() {
      if (this.isUser) {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    if (this.isUser) {
      this.isLoading = false;
    }
  },
  computed: {
    isUser() {
      return this.$store.getters["auth/isAuth"];
    },
    data() {
      this.isLoading = false;
      return this.$store.getters["auth/profileData"];
    },
    dataType() {
      return this.$store.getters["auth/dataType"];
    },
  },
  methods: {
    getUserId() {
      let userId = this.$store.getters["auth/user"]
        ? this.$store.getters["auth/user"].id
        : -1;
      return userId;
    },
    getTime(t) {
      return moment(t).fromNow();
    },
    Clickme(id) {
      const shareBox = document.querySelector(
        `.article_box[data-index='${id}'] .share_box`
      );
      shareBox.classList.toggle("share_opened");
    },
    HeartIt(id) {
      const btnHeart = document.querySelector(
        `.article_box[data-index='${id}'] .btn_heart`
      );
      const icon = btnHeart.querySelector(".fa-heart");
      btnHeart.classList.toggle("hearted");
      this.$axios
        .get(
          `/api/${this.dataType === "articles" ? "posts" : "lights"}/${id}/like`
        )
        .then((res) => {
          if (btnHeart.classList.contains("hearted")) {
            icon.classList.replace("far", "fas");
            this.dataType === "articles"
              ? this.$store.commit("auth/addArticleLike", id)
              : this.$store.commit("auth/addLightLike", id);
          } else {
            icon.classList.replace("fas", "far");
            this.dataType === "articles"
              ? this.$store.commit("auth/removeArticleLike", id)
              : this.$store.commit("auth/removeLightLike", id);
          }
        })
        .catch((err) => {
          btnHeart.classList.toggle("hearted");
        });
    },
    DeleteMe(obj) {
      this.$store.dispatch("auth/delete", obj);
    },
  },
  name: "articlecontent",
};
</script>

<style lang="scss" scoped>
.articles_container {
  padding: 0 10px;

  .articles_box {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    grid-auto-rows: auto;
    width: 100%;
    height: auto;
    position: relative;
  }
  .article_box {
    width: 100%;
    padding: 10px;
    margin: auto;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 0 30px #f3f3f3;
    .article_title {
      padding: 10px;
      font-size: 17px;
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
      .btn_delete {
        float: left;
        padding: 5px 10px;
        margin-left: 5px;
        color: #eb596e;
        border-radius: 8px;
        background-color: #eb596e20;
        cursor: pointer;
        border: none;
        font-size: 15px;
        line-height: 1.7;
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
  .empty {
    display: block;
    margin: 30px auto;
    max-width: 500px;
    position: relative;
    text-align: center;
    text-align: -webkit-center;
    img {
      max-width: 300px;
      display: block;
      margin: auto;
      opacity: 0.7;
      margin-bottom: 20px;
      @media screen and(max-width: 480px) {
        width: 90%;
      }
    }
    .content {
      padding: 10px;
      font-size: 20px;
    }
  }
}
</style>
