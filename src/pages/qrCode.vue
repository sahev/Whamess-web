<template>
  <div>
    <div>
      <b-button v-b-modal.modal-1 @click="getqrcode">Código QR aqui!</b-button>
      <b-modal id="modal-1" title="Aponte o celular aqui para capturar o código">
        <b-overlay :show="isLoading" class="text-center position-relative" rounded="square">
          <b-img thumbnail rounded="square" fluid :src="qrcodestring" alt="QRCode"></b-img>
        </b-overlay>
      </b-modal>
    </div>
    <div>
      <button v-if="status === false " @click="$bvModal.show('modal-qrcode'); getqrcode(); getsession()" class='btn btn-danger'>Offline
        <b-spinner v-if="islogged" id="spinner" small></b-spinner>
      </button>
      <button v-if="status === true" @click="$bvModal.show('modal-qrcode'); getqrcode(); getsession()" class='btn btn-success'>Online
        <b-spinner v-if="islogged" id="spinner" small></b-spinner>
      </button>
      
      <b-modal id="modal-qrcode" hide-footer>
        <template v-slot:modal-title>Aponte o celular aqui para capturar o código</template>
        <div class="d-block text-center">
          <b-overlay :show="isLoading" class="text-center position-relative" rounded="square">
            <b-img thumbnail rounded="square" fluid :src="qrcodestring" alt="QRCode"></b-img>
          </b-overlay>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('modal-qrcode'); getsession();">Continuar</b-button>
      </b-modal>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      qrcodestring: "",
      isLoading: false,
      show: false,
      islogged: false,
      status: false,
    };
  },
  methods: {
    async getqrcode() {
      const token = localStorage.getItem("token");
      this.isLoading = true;

      let res = await axios.get("getqrcode/", {
        headers: { Authorization: "Bearer " + token },
      });
      this.isLoading = false;
      this.qrcodestring = "data:image/png;base64, " + res.data.string;
    },

    async getsession() {
      const token = localStorage.getItem("token");
      this.islogged = true;

      let res = await axios.get("session/", {
        headers: { Authorization: "Bearer " + token },
      });
      
      if (res.data.islogged === true) {
        this.status = true
        this.islogged = false;
      } else {
        this.status = false
        this.islogged = false
      }
      //console.log(res.data, this.status);
    },
  },
};
</script>
