<template>
  <div>
    <b-button v-b-toggle.sidebar-backdrop variant="primary">Inicie aqui com QRCode</b-button>
    <b-sidebar id="sidebar-backdrop" :title="title" backdrop-variant="dark" backdrop shadow>
      <select class="px-3 py-2" v-model="port" @change="getqrcode(port)">
        <option value disabled>Selecione um perfil</option>
        <option
          v-for="profile in profiles"
          :key="profile.port"
          :value="profile.port"
        >{{profile.name}}</option>
      </select>
      <div class="px-3 py-2">
        <div v-if="isLoading === true" class="d-flex justify-content-center flex-column">
          <atom-spinner
            class="align-self-center"
            :animation-duration="1000"
            :size="100"
            :color="'#000000'"
          />
          <b>{{ loadingMessage }}...</b>
        </div>
        <img v-if="isLoading === false" :src="qrcodestring" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { AtomSpinner } from "epic-spinners";
export default {
  components: {
    AtomSpinner,
  },
  data() {
    return {
      port: "",
      title: "Perfil: ",
      profiles: [
        { port: "9222", name: "principal" },
        { port: "9223", name: "secundário" },
        { port: "9224", name: "terciário" },
      ],
      qrcodestring: "",
      isLoading: false,
    };
  },
  methods: {
    async getqrcode() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      try {
        let res = await axios.get(`http://localhost:3000/getqrcode/`, {
          headers: { Authorization: "Bearer " + token },
        });
        this.isLoading = false;
        this.qrcodestring = "data:image/png;base64, " + res.data.string;
      } catch {
        router.push("/");
        alert('Sessão expirada!')
      }
      //console.log(port);
    },
  },
};
</script>