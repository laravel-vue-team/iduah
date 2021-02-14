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
        <tr v-for="(item, index) in users" :key="index">
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
            <a href="javascript:void(0)" @click="CopyUserId(item.ID)">
              <i class="far fa-copy"></i> {{ item.ID }}
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
    return {
      users: [
        {
          name: "احمد محمد",
          email: "ahmed078@gmail.com",
          ID: "HJKFQHIKDF8U43",
        },
        {
          name: "احمد السيد",
          email: "ahmed0758@gmail.com",
          ID: "JKJHFKKAWIIKR5",
        },
        {
          name: "احمد محمد",
          email: "ahmed078@gmail.com",
          ID: "HJKFQHIKDF8U43",
        },
        {
          name: "احمد السيد",
          email: "ahmed0758@gmail.com",
          ID: "JKJHFKKAWIIKR5",
        },
        {
          name: "احمد محمد",
          email: "ahmed078@gmail.com",
          ID: "HJKFQHIKDF8U43",
        },
        {
          name: "احمد السيد",
          email: "ahmed0758@gmail.com",
          ID: "JKJHFKKAWIIKR5",
        },
      ],
    };
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
  padding: 10px;
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
