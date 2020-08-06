<template>
  <b-container>
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
          <b-button variant="primary" @click="sheetToJson">Importar</b-button>
          <b-button class="ml-2" variant="danger" @click="clearAll">Limpar</b-button>
          <!-- <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div> -->
        </div>
      </div>
      <div>
        <b-form-textarea
          id="textarea"
          v-model="message"
          placeholder="Digite a mensagem aqui..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>
      <div class="form-bottom pt-3">
        <div>
          <b-button
            class="mr-2"
            v-for="(column, idx) in columns"
            :key="idx"
            @click="addCustomMessage(column)"
          >{{ column }}</b-button>
        </div>
        <div>
          <b-button type="submit" variant="primary">Enviar</b-button>
        </div>
      </div>
      <div class="footer pt-3">
        <p>
          Desenvolvido por
          <a href>Samuel Evangelista</a>
        </p>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import XLSX from "xlsx";

export default {
  name: "ImportMessages",
  props: {},
  data() {
    return {
      file: null,
      columns: [],
      reader: new FileReader(),
      message: "",
    };
  },
  methods: {
    sheetToJson() {
      if (this.file === null) {
        this.showAlertFileEmpty("Favor adicionar um arquivo");
        return;
      }
      if (this.file.name.split(".").pop() !== "xlsx") {
        this.showAlertFileEmpty("Extensão não permitida");
        return;
      }
      console.log(this.file);
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
        this.formatNumbers(workbook.SheetNames, result);
      };

      this.reader.readAsArrayBuffer(this.file);
    },
    submmit() {
      if (this.file === null || this.message === '') {
        this.showAlertFileEmpty("Favor preencher todos os campos!");
        return;
      }
    },
    formatNumbers(sheetNames, result) {
      sheetNames.map((sheet) => {
        result[sheet].map((sheetItem, idx) => {
          if (idx === 0) {
            this.columns = sheetItem;
            return;
          }
          console.log(sheetItem);
        });
      });
    },
    clearAll() {
      this.reader.abort();
      this.file = null;
      this.columns = [];
      this.message = '';
    },
    showAlertFileEmpty(message) {
      this.$bvToast.toast(message, {
        title: "Atenção",
        variant: "warning",
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
    addCustomMessage(message) {
      this.message = `${this.message} {${message}}`;
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
