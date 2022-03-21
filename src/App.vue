<script>
export default {
  data: function () {
    return {
      isLoggedIn: undefined,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.getItem("jwt");
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div v-if="!isLoggedIn">
        <a class="navbar-brand" href="/signup">Signup</a>
        <a class="navbar-brand" href="/login">Login</a>
      </div>
      <div v-if="isLoggedIn">
        <a class="navbar-brand" href="/groups">Groups</a>
        <a class="navbar-brand" href="/logout">Logout</a>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
body {
  background-image: url("./assets/spikes.png");
}
h1 {
  font-family: Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
}
h3 {
  font-family: Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 15.4px;
}
p {
  font-family: Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
blockquote {
  font-family: Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 21px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 30px;
}
pre {
  font-family: Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 18.5714px;
}
</style>
