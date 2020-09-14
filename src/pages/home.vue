<template>
  <b-overlay>
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
              <b-dropdown-item link to="/account">Account</b-dropdown-item>
              <b-dropdown-item @click="signout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container class="pt-5">
      <importmessages />
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
import importmessages from "./components/ImportMessages";

export default {
  name: "Home",
  props: {},
  components: {
    importmessages,
  },
  data() {
    return {
      profile: {},
    };
  },
  created() {
    this.getprofile();
    let thiss = this;

    window.setInterval(async function () {
      if (
        !thiss.status &&
        thiss.displaymodal &&
        localStorage.getItem("token") !== null
      ) {
        thiss.getsession();
      } 
      if (thiss.status === true && thiss.displaymodal) {
        thiss.displaymodal = false;
        clearInterval();
      }
    }, 3000);    
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
