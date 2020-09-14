<template>
  <div>
    <button
      v-if="!status"
      @click="$bvModal.show('modal-qrcode'); getqrcode();"
      class="btn btn-danger"
    >
      Offline
      <b-spinner v-if="islogged" id="spinner" small></b-spinner>
    </button>
    <button v-if="status" class="btn btn-success" disabled>Online</button>
    <b-modal id="modal-qrcode" hide-footer>
      <template v-slot:modal-title>Aponte o celular aqui para capturar o código</template>
      <div class="d-block text-center">
        <b-overlay :show="isLoading" class="text-center position-relative" rounded="square">
          <b-img thumbnail rounded="square" fluid :src="qrcodestring" alt="QRCode"></b-img>
        </b-overlay>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "qrcode",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      qrcodestring: "",
      islogged: false,
      status: false,
      displaymodal: false,
    };
  },
  created() {
    this.getsession();
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

    window.setInterval(async function () {
      if (thiss.status && localStorage.getItem("token") !== null) {
        thiss.getsession();
      } 
    }, 10000);
  },
  computed: {},
  methods: {
    async getsession() {
      try {
        const token = localStorage.getItem("token");
        this.islogged = true;

        let res = await axios.get("session/", {
          headers: { Authorization: "Bearer " + token },
        });

        if (res.data.islogged === true) {
          this.status = true;
          this.$bvModal.hide("modal-qrcode");
          this.islogged = false;
        } else {
          this.status = false;
          this.islogged = false;
        }
      } catch {
        router.push("/");
        localStorage.removeItem("token");
        this.showAlert("Sessão expirada!", "danger");
      }
    },
    async getqrcode() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.displaymodal = true;

      try {
        let res = await axios.get("getqrcode/", {
          headers: { Authorization: "Bearer " + token },
        });
        this.isLoading = false;
        this.qrcodestring = "data:image/png;base64, " + res.data.string;
      } catch {
        router.push("/");
        localStorage.removeItem("token");
        this.showAlert("Sessão expirada!", "danger");
      }
    },
    showAlert(message, status) {
      this.$bvToast.toast(message, {
        title: status === "success" ? "Sucesso" : "Atenção",
        variant: status,
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
  },
};
</script>
<style scoped>
</style>
