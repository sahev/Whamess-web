import XLSX from "xlsx";
import axios from "axios";
import { AtomSpinner } from "epic-spinners";

export default {
  name: "ImportMessages",
  props: {},
  components: {
    AtomSpinner,
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
    };
  },
  computed: {
    paginationRows() {
      return this.sheetItems.length;
    },
  },
  methods: {
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
      this.isLoading = true;
      this.loadingMessage = "Enviando mensagens";
      axios
        .post("messages/send", {
          columnSheet: this.sheetItems,
          message: this.message,
        })
        .then((result) => {
          this.clearAll();
          this.showAlert("Mensagens enviadas com sucesso!", "success");
          this.isLoading = false;
          console.log(result);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
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
        title: message === "success" ? "Sucesso" : "Atenção",
        variant: status,
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
    showAlertSuccess(message) {
      this.$bvToast.toast(message, {
        title: "Sucesso",
        variant: "success",
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
    addCustomMessage(message) {
      const cursorPosition = this.$refs["inputTextArea"].selectionStart;
      if (cursorPosition === 0) {
        this.message = `${this.message} {${message}}`;
      } else {
        this.message = [
          this.message.slice(0, cursorPosition),
          `{${message}}`,
          this.message.slice(cursorPosition),
        ].join("");
      }
      this.$refs["inputTextArea"].focus()
    },
  },
};