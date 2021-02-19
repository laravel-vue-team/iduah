<template>
  <div>
    <HeaderLayout />
    <Nuxt />
    <FooterLayout />
  </div>
</template>
<script>
export default {
  mounted() {
    if (process.client) {
      this.$store.commit("auth/setIsLoading", false);
      let token =
        localStorage.getItem("TOKEN") || sessionStorage.getItem("TOKEN");
      this.$store.dispatch("auth/setToken", token);
      if (
        !this.$store.getters["auth/isAuth"] &&
        (this.$router.history._startLocation === "/profile" ||
          this.$router.history._startLocation === "/admin" ||
          this.$router.history._startLocation === "/admin/users" ||
          this.$router.history._startLocation ===
            "/admin/administrative_pages" ||
          this.$router.history._startLocation === "/admin/sections" ||
          this.$router.history._startLocation === "/admin/lights" ||
          this.$router.history._startLocation === "/admin/articles" ||
          this.$router.history._startLocation === "/create-article" ||
          this.$router.history._startLocation === "/settings")
      ) {
        return this.$router.push("/login");
      }
      let userData =
        localStorage.getItem("USER") || sessionStorage.getItem("USER");
      this.$store.dispatch("auth/setUser", JSON.parse(userData));
    }
  },
};
</script>
