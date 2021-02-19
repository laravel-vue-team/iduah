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
      let token =
        localStorage.getItem("TOKEN") || sessionStorage.getItem("TOKEN");
      this.$store.dispatch("auth/setToken", token);
      let userData =
        localStorage.getItem("USER") || sessionStorage.getItem("USER");
      this.$store.dispatch("auth/setUser", JSON.parse(userData));
    }
  },
};
</script>
