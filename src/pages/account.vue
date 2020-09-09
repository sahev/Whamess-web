<template>
<b-overlay :show="isLoading" rounded="sm">
  <b-container>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <img src="../assets/logo.png" alt class="logo" width="34" height="34" />
          <b-nav-item link to="/home">Whamess</b-nav-item>
          <!-- Navbar dropdowns -->
        </b-navbar-nav>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown :text="this.profile.name + ' ' + this.profile.lastname" right>
              <b-dropdown-item>Account</b-dropdown-item>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
              <b-dropdown-item @click="signout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="mr-auto">
        <ul>Nome: {{profile.name}} {{profile.lastname}} </ul>
        <ul>E-mail: {{profile.email}}</ul>
        <ul>Mensagens disponíveis: {{2000 - profile.messagesCount}}</ul>
      </div>
    </div>
    <div class="footer pt-3">
      <p>
        Desenvolvido por
        <a href>Samuel Evangelista</a>
      </p>
    </div>
  </b-container>
  </b-overlay>
</template>
<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Account",
  props: {},
  data() {
    return {
      isLoading: false,
      islogged: false,
      profile: {},
    };
  },
  created() {
    this.getprofile();
  },
  computed: {},
  methods: {
    async signout() {
      localStorage.removeItem("token");
      router.push("/");
    },
    async getprofile() {
      const token = localStorage.getItem("token");
      var jwt = require("jsonwebtoken");
      var { email } = jwt.verify(token, "secretKey");

      let res = await axios.get(`users/getbyemail/${email}`, {
        headers: { Authorization: "Bearer " + token },
      });

      this.profile = res.data;
    },
  },
};
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.form-header {
  display: flex;
  justify-content: space-between;
}
.form-bottom {
  display: flex;
  justify-content: space-between;
}
</style>
