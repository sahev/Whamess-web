<template>
  <div id="app">
    <router-link to="login"></router-link>
    <router-link to="home"></router-link>
    <router-view/>
  </div>
</template>

<script>
// import ImportMessages from "./pages/ImportMessages.vue";
// import Login from "./pages/Login.vue";

// export default {
//   name: "App",
//   components: {
//     ImportMessages,
//     Login
//   },
// };

export default {
  name: 'app'
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
