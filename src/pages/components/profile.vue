<template>
    <div>
      <div>
              <!-- <b-card bg-variant="light"> -->
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
      </div>
    </div>
</template>
<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "Profile",
  props: {},
  components: {},
  data() {
    return {
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
    update() {
      this.updatebutton = !this.updatebutton;
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
