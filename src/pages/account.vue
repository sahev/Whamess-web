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
              <b-card bg-variant="light">
                <b-card-text>Mensagens enviadas por modelo</b-card-text>
               
                  <chartjs-line
                    v-bind:labels="labels"
                    :datasets="linedatasets"
                    :option="lineoption"
                    :height="50"
                  ></chartjs-line>
                
              </b-card>
            </b-tab>
            <b-tab title="Perfil">
              <b-card bg-variant="light">
                <b-form @submit="updateProfile" class="m-4">
                  <b-form-group
                    label-cols-lg="3"
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
                      <b-form-input
                        v-model="profile.name"
                        :value="profile.name"
                        id="inp-name"
                        :disabled="!this.updatebutton"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols-sm="3"
                      label="Sobrenome:"
                      label-align-sm="right"
                      label-for="inp-lastname"
                      :disabled="!this.updatebutton"
                    >
                      <b-form-input
                        v-model="profile.lastname"
                        :value="profile.lastname"
                        id="inp-lastname"
                        :disabled="!this.updatebutton"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols-sm="3"
                      label="E-mail:"
                      label-align-sm="right"
                      label-for="inp-email"
                    >
                      <b-form-input
                        type="email"
                        v-model="profile.email"
                        :value="profile.email"
                        id="inp-email"
                        disabled
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols-sm="3"
                      label="Telefone:"
                      label-align-sm="right"
                      label-for="inp-phone"
                    >
                      <b-form-input
                        type="text"
                        v-model="profile.phone"
                        :value="profile.phone"
                        id="inp-phone"
                        :disabled="!this.updatebutton"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols-sm="3"
                      label="Criado em:"
                      label-align-sm="right"
                      label-for="inp-createdon"
                    >
                      <b-form-input
                        v-model="profile.createdOn"
                        :value="profile.createdOn"
                        id="inp-createdon"
                        disabled
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols-sm="3"
                      label="Data de vencimento:"
                      label-align-sm="right"
                      label-for="inp-expiration"
                    >
                      <b-form-input
                        v-model="profile.expiresOn"
                        :value="profile.expiresOn"
                        id="inp-expiration"
                        disabled
                      ></b-form-input>
                    </b-form-group>

                    <div class="float-right">
                      <b-button-toolbar key-nav>
                        ´
                        <div id="submit" class="mx-1">
                          <b-button
                            v-if="!updatebutton"
                            @click="update"
                            variant="primary"
                            style="width: 15rem"
                          >Atualizar</b-button>
                        </div>

                        <div id="cancel" class="mx-1">
                          <b-button
                            v-show="updatebutton"
                            type="submit"
                            variant="success"
                            style="width: 15rem"
                          >Salvar</b-button>
                        </div>

                        <div id="cancel" class="mx-1">
                          <b-button
                            v-show="updatebutton"
                            @click="update(); getprofile();"
                            variant="outline-danger"
                            style="width: 15rem"
                          >Cancelar</b-button>
                        </div>
                      </b-button-toolbar>
                    </div>
                  </b-form-group>
                </b-form>
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

export default {
  name: "Account",
  props: {},
  data() {
    return {
      isLoading: false,
      islogged: false,
      profile: {},
      updatebutton: false,
      labels: [
        "Hoje",
        "-",
        "-",
        "-",
        "-",
        "-",
        "6 dias atrás",
      ],
      piedatasets: [
        {
          data: [20, 30, 18, 20, 30, 18, 50],
          backgroundColor: ["red", "blue", "yellow"],
        },
      ],
      pieoption: {
        title: {
          display: true,
          position: "bottom",
          text: "Mensagens enviadas",
        },
      },
      linedatasets: [
        {
          label: "perfil 1",
          data: [],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
      lineoption: {
        title: {
          display: true,
          position: "bottom",
          text: "Mensagens enviadas",
        },
      },
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      var jwt = require("jsonwebtoken");
      var { id } = jwt.verify(token, "secretKey");

      let res = await axios.get("users/messagesperday", {
        headers: { Authorization: "Bearer " + token },
        params: { id },
      });
      let qnt = res.data.map((ret) => {
        return ret.mes_messagesperday;
      });
      this.linedatasets[0].data = qnt;
    } catch {
      // alert("sessao expirada");
      // localStorage.removeItem("token");
      // router.push("/");
    }

    this.getprofile();
  },
  computed: {},
  methods: {
    updateChart() {
      //window.myLineChart.update();
    },
    async getmessagesperday() {
      try {
        const token = localStorage.getItem("token");
        var jwt = require("jsonwebtoken");
        var { id } = jwt.verify(token, "secretKey");

        let res = await axios.get("users/messagesperday", {
          headers: { Authorization: "Bearer " + token },
          params: { id },
        });

        console.log(res.data);
      } catch {
        // alert("sessao expirada");
        // localStorage.removeItem("token");
        // router.push("/");
      }
    },
    showAlert(message, status) {
      this.$bvToast.toast(message, {
        title: status === "success" ? "Sucesso" : "Atenção!",
        variant: status,
        solid: true,
      });
    },
    update() {
      this.updatebutton = !this.updatebutton;
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
        // alert("sessao expirada");
        // localStorage.removeItem("token");
        // router.push("/");
      }
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem("token");
        var jwt = require("jsonwebtoken");
        var { id } = jwt.verify(token, "secretKey");

        let res = await axios.patch(`users/`, this.profile, {
          headers: { Authorization: "Bearer " + token },
          params: { id },
        });

        this.showAlert("Cadastro atualizado!", "success");
        this.updatebutton = !this.updatebutton;
        this.profile = res.data;
        this.profile.createdOn = this.profile.createdOn.split("T")[0];
        this.profile.expiresOn = this.profile.expiresOn.split("T")[0];
      } catch {
        // alert("sessao expirada");
        // localStorage.removeItem("token");
        // router.push("/");
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
