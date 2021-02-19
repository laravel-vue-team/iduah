<template>
  <div class="users_content">
    <table class="users_data" width="100%">
      <thead>
        <tr>
          <th>رقم المقال</th>
          <th>عنوان المقال</th>
          <th>زمن النشر</th>
          <th>الاجراء</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in articles" :key="index">
          <td>{{ item.id }}</td>
          <td>
            {{ item.title }}
          </td>
          <td>{{ timeFromNow(item.created_at) }}</td>
          <td>
            <button
              class="btn_delete transition"
              @click="DeleteArticle({ id: item.id, index })"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button
        class="btn next"
        @click="fetchPage(currentPage + 1)"
        :disabled="!this.isThereNextPage ? true : false"
      >
        {{ !isNextLoading ? "&rarr; الصفحة التالية" : "جاري الانتقال ..." }}
      </button>
      <button
        class="btn prev"
        @click="fetchPage(currentPage - 1)"
        :disabled="!this.isTherePrevPage ? true : false"
      >
        {{ !isPrevLoading ? "الصفحة السابقة &larr;" : "جاري الانتقال ..." }}
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("ar");
export default {
  data() {
    return {
      // "6 فبراير 2021" -
      // "6:00 مساءًا"
      isNextLoading: true,
      isPrevLoading: true,
    };
  },
  async created() {
    this.$store.dispatch("articles/fetchArticles");
    this.isNextLoading = false;
    this.isPrevLoading = false;
  },
  computed: {
    articles() {
      return this.$store.getters["articles/articles"];
    },
    isTherePrevPage() {
      let isPrevPage = this.$store.getters["articles/isTherePrevPage"];
      return isPrevPage;
    },
    isThereNextPage() {
      let isNextPage = this.$store.getters["articles/isThereNextPage"];
      return isNextPage;
    },
    currentPage() {
      return this.$store.getters["articles/currentPage"];
    },
  },
  methods: {
    fetchPage(pageId) {
      pageId === this.currentPage + 1
        ? (this.isNextLoading = true)
        : (this.isPrevLoading = true);
      this.$axios
        .get(`/api/posts?page=${pageId}`)
        .then((res) => {
          this.isNextLoading = false;
          this.isPrevLoading = false;
          this.$store.dispatch("articles/setArticles", res.data.data.data);
          this.$store.commit(
            "articles/setCurrentPage",
            res.data.data.current_page
          );
          this.$store.commit(
            "articles/setIsThereNextPage",
            res.data.data.next_page_url ? true : false
          );
          this.$store.commit(
            "articles/setIsTherePrevPage",
            res.data.data.prev_page_url ? true : false
          );
        })
        .catch((err) => {});
    },
    timeFromNow(timeStmp) {
      return (
        moment(timeStmp).format(" YYYY/M/Do") +
        " _ " +
        moment(timeStmp).format("h:mm a")
      );
    },
    DeleteArticle(obj) {
      this.$store.dispatch("articles/deleteArticle", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  position: fixed;
  bottom: 10px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.btn {
  padding: 7px 15px;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline;
  width: 136px;
  white-space: nowrap;
  background-color: #1b5fdf;
}
.prev {
  background-color: #eb596e;
}
.next {
  margin: 0 10px 0 8px;
}
.users_content {
  padding: 0;
  width: 100%;
  padding-bottom: 70px;
  height: calc(100vh - 50px);
  overflow-y: scroll;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 1px rgb(255 255 255 / 50%);
  box-shadow: 0 0 1px rgb(255 255 255 / 50%);
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 4px;
}
.users_data {
  position: relative;
  display: table;
  height: auto;
  background-color: #fff;
  border-collapse: collapse;
  border-spacing: 0;
  th {
    background-color: #1b5fdf;
    color: #fff;
    font-weight: 500;
  }
  th,
  td {
    padding: 10px;
    text-align: center;
    text-align: -webkit-center;
    border-left: 1px solid #bbbbbb;
    &:last-child {
      border-left: 0;
    }
    a {
      color: #1b5fdf;
      text-decoration: none;
    }
  }

  tr {
    &:nth-child(even) {
      background-color: #f1f1f1;
    }
    .btn_delete {
      padding: 5px 10px;
      border-radius: 5px;
      color: #e11d74;
      cursor: pointer;
      border: none;
      line-height: 1.5;
      background-color: #e11d7450;
    }
  }
}
</style>
