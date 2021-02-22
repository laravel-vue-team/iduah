<template>
  <div class="users_content">
    <table class="users_data" width="100%">
      <thead>
        <tr>
          <th>إسم المستخدم</th>
          <th>البريد الالكتروني</th>
          <th>رقم المستخدام</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <a
              :href="'mailto:' + item.email"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.email }}
            </a>
          </td>
          <td>
            <a href="javascript:void(0)" @click="CopyUserId(item.id)">
              <i class="far fa-copy"></i> {{ item.id }}
            </a>
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
export default {
  data() {
    return {
      isNextLoading: true,
      isPrevLoading: true,
      isLoading: true,
    };
  },
  created() {
    this.$store.dispatch("allUsers/fetchAllUsers");
    this.isNextLoading = false;
    this.isPrevLoading = false;
  },
  middleware: "authenticated",
  computed: {
    users() {
      this.isLoading = true;
      const newUsers = this.$store.getters["allUsers/users"];
      this.isLoading = false;
      return newUsers;
    },
    isTherePrevPage() {
      let isPrevPage = this.$store.getters["allUsers/isTherePrevPage"];
      return isPrevPage;
    },
    isThereNextPage() {
      let isNextPage = this.$store.getters["allUsers/isThereNextPage"];
      return isNextPage;
    },
    currentPage() {
      return this.$store.getters["allUsers/currentPage"];
    },
    // isLoading() {},
  },
  methods: {
    CopyUserId(id) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id);
      }
    },
    fetchPage(pageId) {
      pageId === this.currentPage + 1
        ? (this.isNextLoading = true)
        : (this.isPrevLoading = true);
      this.$axios
        .get(`/api/users?page=${pageId}`)
        .then((res) => {
          this.isNextLoading = false;
          this.isPrevLoading = false;
          this.$store.commit("allUsers/setUsers", res.data.data.data);
          this.$store.commit(
            "allUsers/setCurrentPage",
            res.data.data.current_page
          );
          this.$store.commit(
            "allUsers/setIsThereNextPage",
            res.data.data.next_page_url ? true : false
          );
          this.$store.commit(
            "allUsers/setIsTherePrevPage",
            res.data.data.prev_page_url ? true : false
          );
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  width: 100%;
  margin-top: 2vh;
}
.pagination {
  position: fixed;
  bottom: 10px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.btn {
  outline: 0;
  &:focus {
    outline: 0;
  }
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
.users_content {
  padding: 0 5px 0 0;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: auto;
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
  }
}
</style>
