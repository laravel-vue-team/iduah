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
  </div>
</template>

<script>
import moment from "moment";
moment.locale("ar");
export default {
  data() {
    return {};
  },
  computed: {
    lights() {
      console.log(this.$store.getters["lights/lights"]);
      return this.$store.getters["lights/lights"];
    },
  },
  created() {
    this.$store.dispatch("lights/fetchLights");
  },
  methods: {
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
