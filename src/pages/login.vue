<template>
  <b-container class="login-page">
    <b-card bg-variant="light" text-variant="black" size="lg" class="login-card">
      <h1>Whamess</h1>
      <b-form @submit="onSubmit" @reset="onReset" class="m-4">
        <b-form-group class="align-self-start" id="input-group-1">
          <b-form-input
            id="input-email"
            v-model="login.email"
            type="email"
            placeholder="E-mail"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2">
          <b-form-input
            id="input-password"
            v-model="login.password"
            type="password"
            placeholder="Password"
            required
          ></b-form-input>
        </b-form-group>

        <div class="d-flex justify-content-between">
          <b-form-checkbox
            id="checkbox-lembrarme"
            v-model="checkBoxLembrarMe"
            name="checkbox-lembrarme"
            :value="false"
            :unchecked-value="false"
            size="md"
          >Lembrar-me</b-form-checkbox>
          <b-link href="/">Esqueci a senha</b-link>
        </div>

        <div class="container-buttons pt-3">
          <div class="pt-3">
            <b-button type="submit" variant="primary" style="width: 15rem">Acessar</b-button>
          </div>
          <div class="pt-3">
            <a href="/">Cadastrar</a>
          </div>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script src="../scripts/login.js"></script>

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