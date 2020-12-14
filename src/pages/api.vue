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
  <b-card bg-variant="light">
      
    <b-form-group
      label-cols-lg="3"
      label="status"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
    
      <b-form-group
        label-cols-sm="3"
        label="_v:"
        label-align-sm="right"
        label-for="nested-street"
      >
        <b-form-input :value="ports._v" disabled></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="_n:"
        label-align-sm="right"
        label-for="nested-city"
      >
        <b-form-input :value="ports._n" disabled></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="token:"
        label-align-sm="right"
        label-for="nested-state"
      >
        <b-form-input :value="profile.token" disabled></b-form-input>
      </b-form-group>
    </b-form-group>
        <qrcode />
  </b-card>
</div>


    <!-- END SCAN QRCODE -->
    

  
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
import qrcode from "./components/qrcode";

export default {
  name: "api",
  props: {},
  components: {
    qrcode,
  },
  data() {
    return {
      profile: {},
      islogged: false,
      status: false,
      ports: {},
    };
  },
  created() {
    this.getprofile();
    this.getConnection();
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
  async getConnection() {
    const token = localStorage.getItem("token");
    var jwt = require("jsonwebtoken");
    var { _v, _n } = jwt.verify(token, "secretKey");

    this.ports = { _v, _n };
const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
    console.log(uid());
  },

},

};
</script>
<style scoped>

</style>
