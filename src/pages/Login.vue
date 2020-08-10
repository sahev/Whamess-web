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
        <img :src="qrcodestring" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
    };
  },
  methods: {
    async getqrcode(port) {
      let res = await axios.get(`http://localhost:3000/getqrcode/${port}`, {});
      this.qrcodestring = "data:image/png;base64, " + res.data.string;
      console.log(port);
    },
  },
};
</script>
