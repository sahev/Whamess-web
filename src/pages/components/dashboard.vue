<template>

    <b-card>
      <b-card-group deck>
        <b-card bg-variant="secondary" text-variant="white" header="Diário" class="text-center">
          <b-card-text>{{ this.countday }}</b-card-text>
        </b-card>

        <b-card bg-variant="secondary" text-variant="white" header="Semanal" class="text-center">
          <b-card-text>{{ this.countweekly }}</b-card-text>
        </b-card>

        <b-card bg-variant="secondary" text-variant="white" header="Mensal" class="text-center">
          <b-card-text>{{ this.countmonthly }}</b-card-text>
        </b-card>
      </b-card-group>
      <b-card-text/>
      <line-chart :chartData="arrMes_messagesperweekly" :options="chartOptions" label="Semanal"></line-chart>
    </b-card>

</template>
<script>
import axios from "axios";
import moment from "moment";
import LineChart from "./LineChart";

export default {
  mounted() {},
  name: "dashchart-line",
  props: {},
  components: {
    LineChart,
  },
  data() {
    return {
      arrMes_id: [],
      arrUsr_id: [],
      countday: 0,
      countweekly: 0,
      countmonthly: 0,
      arrMes_messagesperday: [],
      arrMes_messagesperweekly: [],
      arrMes_messagespermonth: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  async created() {
    await this.getperweek();
    await this.getperday();
    await this.getpermontlhy();
  },
  computed: {},

  methods: {
    async getperday() {
      var initial = 0;
      const token = localStorage.getItem("token");
      var jwt = require("jsonwebtoken");
      var { id } = jwt.verify(token, "secretKey");

      axios
        .get("users/messagesperday", {
          headers: { Authorization: "Bearer " + token },
          params: { id },
        })
        .then((res) => {
          res.data.forEach((d) => {
            const { mes_messagesperday } = d;

            this.arrMes_messagesperday.push({
              total: mes_messagesperday,
            });
          });
          this.countday = this.arrMes_messagesperday.reduce(function (
            sum,
            current
          ) {
            return sum + current.total;
          },
          initial);
        });
    },

    async getperweek() {
      var initial = 0;
      const token = localStorage.getItem("token");
      var jwt = require("jsonwebtoken");
      var { id } = jwt.verify(token, "secretKey");

      const { data } = await axios.get("users/messagesperweek", {
        headers: { Authorization: "Bearer " + token },
        params: { id },
      });

      data.forEach((d) => {
        const date = moment(d.mes_date).locale("pt").format("dddd");
        const { mes_id, usr_id, mes_messagesperday } = d;

        this.arrMes_id.push({ date, total: mes_id });
        this.arrUsr_id.push({ date, total: usr_id });
        this.arrMes_messagesperweekly.push({
          usr_id,
          date,
          total: mes_messagesperday,
        });
      });

      this.countweekly = this.arrMes_messagesperweekly.reduce(function (
        sum,
        current
      ) {
        return sum + current.total;
      },
      initial);
    },

    async getpermontlhy() {
      var initial = 0;
      const token = localStorage.getItem("token");
      var jwt = require("jsonwebtoken");
      var { id } = jwt.verify(token, "secretKey");

      axios
        .get("users/messagespermonth", {
          headers: { Authorization: "Bearer " + token },
          params: { id },
        })
        .then((res) => {
          res.data.forEach((d) => {
            const { mes_messagesperday } = d;

            this.arrMes_messagespermonth.push({
              total: mes_messagesperday,
            });
          });
          this.countmonthly = this.arrMes_messagespermonth.reduce(function (
            sum,
            current
          ) {
            return sum + current.total;
          },
          initial);
        });
    },
  },
};
</script>
<style scoped>
</style>
