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
        <tr v-for="(item, index) in lights" :key="index">
          <td>{{ item.ID }}</td>
          <td>
            {{ item.title }}
          </td>
          <td>{{ item.date }} - {{ item.time }}</td>
          <td>
            <button class="btn_delete transition" @click="DeleteArticle(index)">
              <i class="far fa-trash-alt"></i>
            </button>
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
      lights: [
        {
          date: "6 فبراير 2021",
          time: "6:00 مساءًا",
          ID: 0,
          title: "حدث شريف",
        },
        {
          date: "6 فبراير 2021",
          time: "6:00 مساءًا",
          ID: 1,
          title: "حدث شريف",
        },
        {
          date: "6 فبراير 2021",
          time: "6:00 مساءًا",
          ID: 2,
          title: "حدث شريف",
        },
        {
          date: "6 فبراير 2021",
          time: "6:00 مساءًا",
          ID: 3,
          title: "حدث شريف",
        },
        {
          date: "6 فبراير 2021",
          time: "6:00 مساءًا",
          ID: 4,
          title: "حدث شريف",
        },
      ],
    };
  },
  methods: {
    DeleteArticle(id) {
      return this.lights.splice(id, 1);
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
