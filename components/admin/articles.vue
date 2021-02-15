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
    };
  },
  created() {
    this.$store.dispatch("articles/fetchArticles");
  },
  computed: {
    articles() {
      return this.$store.getters["articles/articles"];
    },
  },
  methods: {
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
.users_content {
  padding: 0 10px;
  width: 100%;
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
