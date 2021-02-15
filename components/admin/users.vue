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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    let isAuth = this.$store.getters["auth/isAuth"];
    if (isAuth) {
      this.$store.dispatch("allUsers/fetchAllUsers");
    }
  },
  middleware: "authenticated",
  computed: {
    users() {
      return this.$store.getters["allUsers/allUsers"];
    },
  },
  methods: {
    CopyUserId(id) {
      console.log(id);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id);
      }
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
  }
}
</style>
