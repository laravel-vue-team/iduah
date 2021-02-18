<template>
  <div class="articles_container container_responsive_wrapper container_hg">
    <!-- <div id="fb-root"></div>
    <script
      async
      defer
      crossorigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
      nonce="TO1sdJNB"
    ></script> -->
    <article
      class="article_box"
      :data-index="article.user_id"
      ref="single_article"
    >
      <!-- article header -->
      <div class="article_header">
        <p class="header_content">
          <span class="name">
            <i class="far fa-user"></i>
            {{ article.user && article.user.name }}
          </span>
          |
          <span class="date">
            <i class="far fa-clock"></i>
            {{ createTime(article.created_at) }}
          </span>
        </p>
      </div>

      <!-- article content -->

      <div class="artcile_content">
        <p class="content" ref="content">
          {{ article.description }}
        </p>
      </div>

      <!-- article controls  -->
      <div class="article_controls">
        <button class="btn_heart transition" @click="HeartIt(article.id)">
          <span class="length">{{
            article.likes && article.likes.length
          }}</span>
          <i class="far fa-heart transition"></i>
        </button>

        <div class="view">
          <span class="length">{{
            article.views && article.views.length
          }}</span>
          <i class="far fa-eye"></i>
        </div>

        <div class="btn_share" @click="Clickme(article.user_id)">
          <i class="fa fa-share"></i>

          <div class="share_box transition">
            <ul class="share_socials">
              <li
                class="share_li"
                :data-href="
                  encodeURI(loc.origin + '/article_page/' + article.id)
                "
              >
                <div
                  class="fb-share-button"
                  :data-href="
                    encodeURI(loc.origin + '/article_page/' + article.id)
                  "
                  data-layout="button"
                  data-size="small"
                >
                  <a
                    :href="
                      'https://www.facebook.com/sharer/sharer.php?u=' +
                      encodeURI(loc.origin + '/article_page/' + article.id) +
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
                      `https://twitter.com/intent/tweet?url=${loc.origin}/article_page/${article.id}&text=${article.description}`
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
                      `https://wa.me/?text=${article.description} ${loc.origin}/article_page/${article.id}&text=${article.description}, ${loc.origin}/article_page/${article.id}`
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
      id: "",
    };
  },
  created() {
    if (process.browser) this.loc = window.location;
    let q = this.$router.history.current.params;
    this.$axios
      .get(`/api/posts/${q.id}/show`)
      .then((res) => {
        this.$store.commit("articles/setCurrentArticle", res.data); // edit 0 to be article index
      })
      .catch((err) => {
        console.log(err.response);
      });
    return (this.id = this.article && this.article.id);
  },

  computed: {
    articleId() {
      return this.$router.history.current.query.page;
    },
    article() {
      return this.$store.getters["articles/currentArticle"];
    },
  },
  methods: {
    createTime(timeStmp) {
      return moment(timeStmp).fromNow();
    },
    Clickme(id) {
      const shareBox = document.querySelector(
        `.article_box[data-index='${id}'] .share_box`
      );
      shareBox.classList.toggle("share_opened");
    },
    HeartIt(id) {
      const btnHeart = document.querySelector(`.btn_heart`);
      const icon = btnHeart.querySelector(".fa-heart");
      btnHeart.classList.toggle("hearted");
      this.$axios
        .get(`/api/posts/${id}/like`)
        .then((res) => {
          if (btnHeart.classList.contains("hearted")) {
            icon.classList.replace("far", "fas");
            this.article.likes.push({});
          } else {
            icon.classList.replace("fas", "far");
            this.article.likes.pop();
          }
        })
        .catch((err) => {
          btnHeart.classList.toggle("hearted");
          console.log(err.response);
        });
    },
  },
  head() {
    return {
      title: "",
      meta: [
        {
          hid: "description",
          name: "description",
        },
      ],
    };
  },
  name: "contenthome",
};
</script>

<style lang="scss" scoped>
.articles_container {
  width: 100%;
  height: auto;
  position: relative;
  padding: 0 10px;
  max-width: 600px;
  margin: auto;
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
