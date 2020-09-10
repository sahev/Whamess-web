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
          <ul>Nome: {{profile.name}} {{profile.lastname}}</ul>
          <ul>E-mail: {{profile.email}}</ul>
          <ul>Telefone: {{profile.phone}}</ul>
          <ul>Mensagens disponíveis: {{2000 - profile.messagesCount}}</ul>
          <ul>Criado em: {{profile.createdOn}}</ul>
          <ul>Data de vencimento: {{profile.expiresOn}}</ul>
        </div>
        <div>
          <b-card bg-variant="light">
            <b-form-group
              label-cols-lg="3"
              label="Shipping Address"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group
                label-cols-sm="3"
                label="Nome:"
                label-align-sm="right"
                label-for="inp-name"
              >
                <b-form-input id="inp-name"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="E-mail:"
                label-align-sm="right"
                label-for="inp-email"
              >
                <b-form-input id="inp-email"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Telefone:"
                label-align-sm="right"
                label-for="inp-phone"
              >
                <b-form-input id="inp-phone"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Criado em:"
                label-align-sm="right"
                label-for="inp-createdon"
              >
                <b-form-input id="inp-createdon"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Data de vencimento:"
                label-align-sm="right"
                label-for="inp-expiration"
              >
                <b-form-input id="inp-expiration"></b-form-input>
              </b-form-group>              

            </b-form-group>
          </b-card>
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
      console.log(this.profile);
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
