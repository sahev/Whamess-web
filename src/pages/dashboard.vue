<template>
  <b-card no-body>
        <b-card bg-variant="light">
          <b-card-text>{{ meupiru }}</b-card-text>
          <line-chart :chartData="arrMes_messagesperday" :options="chartOptions" label="week"></line-chart>
        </b-card>
  </b-card>
</template>
<script>
import axios from "axios";
import moment from 'moment'
import LineChart from './LineChart'

export default {
  mounted() {},
  name: "dashchart-line",
  props: {
    meupiru: String
  },
  components: {
    LineChart
  },
  data() {
    return {
      arrMes_id: [],
      arrUsr_id: [],
      arrMes_messagesperday: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  async created() {

    const { data } = await axios.get("users/messagesperweek", {
      params: { id: 1 },
    });

    data.forEach(d => {
      const date = moment(d.mes_date).format('dddd');
      
      const {
        mes_id,
        usr_id,
        mes_messagesperday
      } = d 

      this.arrMes_id.push({date, total: mes_id})
      this.arrUsr_id.push({date, total: usr_id})
      this.arrMes_messagesperday.push({ usr_id ,date, total: mes_messagesperday})

    });
  },
  computed: {},
  methods: {},
};
</script>
<style scoped>
</style>
