<template>
  <div>
    <AdminHeader />
    <Nuxt />
  </div>
</template>
<script>
export default {
  created() {
    if (process.client) {
      this.$store.commit("auth/setIsLoading", false);
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
