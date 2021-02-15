<template>
  <div>
    <AdminHeader />
    <Nuxt />
  </div>
</template>
<script>
export default {
  middleware: "authenticated",
  created() {
    if (process.client) {
      this.$store.dispatch("auth/setToken", localStorage.getItem("TOKEN"));
      this.$store.dispatch(
        "auth/setUser",
        JSON.parse(localStorage.getItem("USER"))
      );
    }
    if (!this.$store.getters["auth/isAuth"]) {
      return this.$router.push("/login");
    }
  },
};
</script>
