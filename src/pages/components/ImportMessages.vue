<template>
  <b-overlay :show="isLoading" rounded="sm">
    <b-container class="pt-5">
      <b-form class="form" @submit.stop.prevent="submmit">
        <!-- Styled -->
        <div class="form-header pb-3">
          <b-form-file
            class="w-50"
            v-model="file"
            :state="Boolean(file)"
            placeholder="Escolha um arquivo ou arraste aqui..."
            browse-text="Procurar"
            drop-placeholder="Arraste um arquivo aqui..."
          ></b-form-file>
          <div>
            <!-- <b-spinner label="Spinning" v-if="isLoading"></b-spinner> -->
            <b-button variant="primary" @click="sheetToJson">Importar</b-button>
            <b-button class="ml-2" variant="danger" @click="clearAll">Limpar</b-button>
          </div>
        </div>
        <div>
          <b-form-textarea
            id="textarea"
            v-model="message"
            placeholder="Digite a mensagem aqui..."
            rows="3"
            max-rows="6"
            ref="inputTextArea"
          ></b-form-textarea>
        </div>
        <div class="form-bottom pt-3">
          <div>
            <b-button
              class="mr-2"
              v-for="(column, idx) in columns"
              :key="idx"
              @mousedown.prevent="addCustomMessage(column)"
            >{{ column }}</b-button>
          </div>
          <div>
            <!-- <b-button v-if="status" id="btn-send" type="submit" variant="primary"> -->
              <b-button id="btn-send" type="submit" variant="primary">
              <!-- <b-spinner v-if="isLoading" label="Spinning"></b-spinner> -->
              <span>Enviar</span>
            </b-button>
          </div>
        </div>
        <div class="pt-3">
          <b-table
            striped
            hover
            :per-page="paginationPerPage"
            :current-page="paginationCurrentPage"
            :items="sheetItems"
            id="table"
          />
          <b-pagination
            v-if="paginationRows > 0"
            v-model="paginationCurrentPage"
            :total-rows="paginationRows"
            :per-page="paginationPerPage"
            aria-controls="table"
          />
        </div>

        <!-- SCAN QRCODE -->
        <qrcode />
        <!-- END SCAN QRCODE -->
      </b-form>
    </b-container>
    <template v-slot:overlay>
      <div class="d-flex justify-content-center flex-column">
        <atom-spinner
          class="align-self-center"
          :animation-duration="1000"
          :size="100"
          :color="'#000000'"
        />
        <b>{{ loadingMessage }}...</b>
      </div>
    </template>
  </b-overlay>
</template>
<script>
import XLSX from "xlsx";
import axios from "axios";
import router from "../../router";
import { AtomSpinner } from "epic-spinners";
import qrcode from "./qrcode";

export default {
  name: "ImportMessages",
  props: {},
  components: {
    AtomSpinner,
    qrcode,
  },
  data() {
    return {
      file: null,
      columns: [],
      reader: new FileReader(),
      message: "",
      sheetItems: [],
      isLoading: false,
      loadingMessage: "",
      paginationCurrentPage: 1,
      paginationPerPage: 10,
      profile: {},
      islogged: false,
      status: false,

    };
  },
  created() {
    this.getprofile();
  },
  computed: {
    paginationRows() {
      return this.sheetItems.length;
    },
  },
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
    },
    sheetToJson() {
      if (this.file === null) {
        this.showAlert("Adicione um arquivo!", "warning");
        return;
      }
      if (this.file.name.split(".").pop() !== "xlsx") {
        this.showAlert("Extensão não permitida.", "warning");
        return;
      }
      this.isLoading = true;
      this.loadingMessage = "Importando arquivo";
      this.reader.onload = (e) => {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, { type: "array" });
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1,
          });
          if (roa.length) result[sheetName] = roa;
        });
        this.sheetItems = result;
        this.sheetItems = result[Object.keys(result)[0]];
        this.formatNumbers(workbook.SheetNames, result);
        this.isLoading = false;
      };

      this.reader.readAsArrayBuffer(this.file);
    },
    submmit() {
      if (this.file === null || this.message === "") {
        this.showAlert("Favor preencher todos os campos!", "warning");
        return;
      }
      const token = localStorage.getItem("token");
      var jwt = require("jsonwebtoken");
      var { _v, _n } = jwt.verify(token, "secretKey");
      this.isLoading = true;
      this.loadingMessage = "Enviando mensagens";
      axios
        .post(
          "messages/send",
          {
            columnSheet: this.sheetItems,
            message: this.message,
          },
          {
            headers: { Authorization: "Bearer " + token },
            params: { _v, _n }
          }
        )
        .then((result) => {
          this.clearAll();
          this.showAlert("Mensagens enviadas com sucesso!", "success");
          this.isLoading = false;
          axios.post(
            `users/messagescount/${this.profile.id}/${result.data}`,
            {},
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
          axios.post(
            "users/messagesinfo",
            { usr_id: this.profile.id, mes_messagesperday: result.data },
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
          ~this.showAlert("Sessão expirada!", "danger");
          router.push("/");
          localStorage.removeItem("token");
        });
    },
    formatNumbers(sheetNames, result) {
      result[sheetNames[0]].map((sheetItem, idx) => {
        if (idx === 0) {
          this.columns = sheetItem;
          return;
        }
      });
    },
    clearAll() {
      this.reader.abort();
      this.file = null;
      this.columns = [];
      this.sheetItems = [];
      this.message = "";
      this.paginationCurrentPage = 1;
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
    addCustomMessage(message) {
      const cursorPosition = this.$refs["inputTextArea"].selectionStart;
      if (cursorPosition === 0) {
        this.message = `${this.message} *{${message}}*`;
      } else {
        this.message = [
          this.message.slice(0, cursorPosition),
          `*{${message}}*`,
          this.message.slice(cursorPosition),
        ].join("");
      }
      this.$refs["inputTextArea"].focus();
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
