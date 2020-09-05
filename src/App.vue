<template>
  <div id="app">
    <router-view />    
    <!-- <Login />
    <ImportMessages /> -->
  </div>
</template>

<script>
// import ImportMessages from "./pages/ImportMessages";
// import Login from "./pages/login";

export default {
  name: "App",
  components: {
    // ImportMessages,
    // Login,
  },
};
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
