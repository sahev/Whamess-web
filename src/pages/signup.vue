<template>
  <b-container class="login-page">
    <b-card bg-variant="light" text-variant="black" size="lg" class="login-card">
      <img src="../assets/logo.png" alt class="logo" width="100" height="100"/>
      <b-form @submit="onSubmit" @reset="onReset" class="m-4">
        <b-form-group class="align-self-start" id="input-group-1">
          <b-form-input
            id="input-name"
            v-model="login.name"
            type="text"
            placeholder="Nome"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2">
          <b-form-input
            id="input-lastname"
            v-model="login.lastname"
            type="text"
            placeholder="Sobrenome"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-input
            id="input-phone"
            v-model="login.phone"
            type="tel"
            placeholder="Telefone"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3">
          <b-form-input
            id="input-email"
            v-model="login.email"
            type="email"
            placeholder="E-mail"
            required
          ></b-form-input>
        </b-form-group>        

        <b-form-group id="input-group-5">
          <b-form-input
            id="input-password"
            v-model="login.password"
            type="password"
            placeholder="Senha"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6">
          <b-form-input
            id="input-repassword"
            v-model="login.repassword"
            type="password"
            placeholder="Confirmar senha"
            required
          ></b-form-input>
        </b-form-group>

        <div class="container-buttons pt-3">
          <div class="pt-3">
            <b-button type="submit" variant="primary" style="width: 15rem">Cadastrar</b-button>
          </div>
          <div class="pt-3">
            <b-button link to="/" variant="outline-primary" style="width: 15rem">Voltar</b-button>
          </div>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      login: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        repassword: "",
      },
      checkBoxLembrarMe: true,
    };
  },
  methods: {
    showAlert(message, status) {
        this.$bvToast.toast(message, {
          title: status === "success" ? "Sucesso" : "Atenção!",
          variant: status,
          solid: true
        })     
    },      
    async onSubmit() {
      if (this.login.password !== this.login.repassword) {
        this.showAlert("Digite a senha corretamente", "warning");
      } else {
        
        await axios.post("users/", this.login).then((res) => {
          if (res.data.status === 400) {
            this.showAlert(`E-mail ${this.login.email} já cadastrado.`, "warning");
          } else {
            this.showAlert("Redirecionando para a tela de login...", "success");
            setTimeout(function () {
              router.push('/')
            },3000)
          }
        });
      }
    },

    onReset() {
      console.log("reset");
    },
  },
};
</script>

<style>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 400rem;
  max-width: 30rem;
}

.container-buttons {
  display: flex;
  flex-direction: column;
}
</style>