<template>
  <div class="users_content">
    <table class="users_data" width="100%">
      <thead>
        <tr>
          <th>إسم المستخدم</th>
          <th>زمن النشر</th>
          <th>النص</th>
          <th>الاجراء</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lights" :key="item.id">
          <td>{{ item.user.name }}</td>
          <td>{{ timeFromNow(item.created_at) }} {{ item.time }}</td>
          <td>
            {{ item.description }}
          </td>
          <td>
            <button
              class="btn_delete transition"
              @click="Deletelight({ id: item.id, index })"
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
      isNextLoading: true,
      isPrevLoading: true,
    };
  },
  computed: {
    lights() {
      return this.$store.getters["lights/lights"];
    },
    isTherePrevPage() {
      let isPrevPage = this.$store.getters["lights/isTherePrevPage"];
      console.log("isPrevPage", isPrevPage);
      return isPrevPage;
    },
    isThereNextPage() {
      let isNextPage = this.$store.getters["lights/isThereNextPage"];
      console.log("isNextPage", isNextPage);
      return isNextPage;
    },
    currentPage() {
      console.log("current page", this.$store.getters["lights/currentPage"]);
      return this.$store.getters["lights/currentPage"];
    },
  },
  created() {
    this.$store.dispatch("lights/fetchLights");
    this.isNextLoading = false;
    this.isPrevLoading = false;
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
          console.log(res.data.data);
          this.$store.dispatch("lights/setLights", res.data.data.data);
          this.$store.commit(
            "lights/setCurrentPage",
            res.data.data.current_page
          );
          this.$store.commit(
            "lights/setIsThereNextPage",
            res.data.data.next_page_url ? true : false
          );
          this.$store.commit(
            "lights/setIsTherePrevPage",
            res.data.data.prev_page_url ? true : false
          );
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    Deletelight(obj) {
      this.$store.dispatch("lights/deleteLight", obj);
    },
    timeFromNow(timeStmp) {
      return (
        moment(timeStmp).format("YYYY/M/Do") +
        " _ " +
        moment(timeStmp).format("h:mm a")
      );
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
  transition: 0.7s opacity;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline;
  width: 136px;
  white-space: nowrap;
  background-color: #1b5fdf;
  margin: 0 3px;
}
.prev {
  background-color: #eb596e;
}
.next {
  margin-right: 11px;
}
.users_content {
  padding: 0;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  padding-bottom: 70px;
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
