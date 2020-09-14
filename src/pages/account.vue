<template>
  <b-overlay :show="isLoading" rounded="sm">
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
              <b-dropdown-item link to="/home">Home</b-dropdown-item>
              <b-dropdown-item @click="signout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Dashboard" active>
              <!-- DASHBOARD -->
              <dashboard />
              <!-- END DASHBOARD -->
            </b-tab>
            <b-tab title="Perfil">
              <b-card bg-variant="light">
                <!-- PROFILE -->
                <profile />
                <!-- END PROFILE -->
              </b-card>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    <div class="footer pt-3">
      <p>
        Desenvolvido por
        <a href>Samuel Evangelista</a>
      </p>
    </div>
  </b-overlay>
</template>
<script>
import axios from "axios";
import router from "../router";
import dashboard from "./components/dashboard";
import profile from "./components/profile";

export default {
  name: "Account",
  props: {},
  components: {
    dashboard,
    profile,
  },
  data() {
    return {
      isLoading: false,
      islogged: false,
      profile: {},
      updatebutton: false,
    };
  },
  async created() {
    this.getprofile();
  },
  computed: {},
  methods: {
    showAlert(message, status) {
      this.$bvToast.toast(message, {
        title: status === "success" ? "Sucesso" : "Atenção!",
        variant: status,
        solid: true,
      });
    },
    async signout() {
      localStorage.removeItem("token");
      router.push("/");
    },
    async getprofile() {
      try {
        const token = localStorage.getItem("token");
        var jwt = require("jsonwebtoken");
        var { email } = jwt.verify(token, "secretKey");

        let res = await axios.get(`users/getbyemail/${email}`, {
          headers: { Authorization: "Bearer " + token },
        });
        this.profile = res.data;
        this.profile.createdOn = this.profile.createdOn.split("T")[0];
        this.profile.expiresOn = this.profile.expiresOn.split("T")[0];
      } catch {
        this.showAlert("Sessão expirada!", "danger");
        localStorage.removeItem("token");
        router.push("/");
      }
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
