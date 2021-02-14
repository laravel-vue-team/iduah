<template>
  <div>
    <AdminHeader />
    <Nuxt />
  </div>
</template>
<script>
export default {
  middleware: "authenticated",
  mounted() {
    if (process.client) {
      this.$store.dispatch("auth/setToken", localStorage.getItem("TOKEN"));
      this.$store.dispatch(
        "auth/setUser",
        JSON.parse(localStorage.getItem("USER"))
      );
    }
  },
};
</script>
