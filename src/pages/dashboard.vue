<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Dashboard" active>
        <b-card bg-variant="light">
          <b-card-text>Tab contents 1</b-card-text>

          <div>
            <chartjs-line
              v-bind:labels="labels"
              :datasets="linedatasets"
              :option="lineoption"
              :height="50"
            ></chartjs-line>
          </div>

          <!-- <tr v-for="group of groups" :key="group.mes_id">
                <td>{{ group.mes_messagesperday }}</td>
                <td>{{ group.mes_date }} </td>
                <td>{{ group.mes_id }} </td>
          </tr>-->
          <!-- <div class="h-100">

              <chartjs-doughnut
                v-bind:labels="labels"
                :datasets="piedatasets"
                :option="pieoption"
                :height="50"
              ></chartjs-doughnut>
          </div>-->
        </b-card>
      </b-tab>
    </b-tabs>
  </b-card>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      labels: [],
      //labels: ["2020-09-04T03:00:00.000Z", "2020-09-05T03:00:00.000Z", "2020-09-06T03:00:00.000Z", "2020-09-07T03:00:00.000Z", "2020-09-08T03:00:00.000Z", "2020-09-09T03:00:00.000Z", "2020-09-10T03:00:00.000Z"],
      piedatasets: [
        {
          data: [20, 30, 18, 20, 30, 18, 50],
          backgroundColor: ["red", "blue", "yellow"],
        },
      ],
      pieoption: {
        title: {
          display: true,
          position: "bottom",
          text: "Mensagens enviadas",
        },
      },
      linedatasets: [
        {
          label: "perfil 1",
          data: [],
          borderColor: [
            "rgba(255, 99, 132, 1)"
          ],
          borderWidth: 1,
        },
      ],
      lineoption: {
        title: {
          display: true,
          position: "bottom",
          text: "Mensagens enviadas",
        },
      },
    };
  },
  async created() {
      this.labels = ["2020-09-04T03:00:00.000Z", "2020-09-05T03:00:00.000Z", "2020-09-06T03:00:00.000Z", "2020-09-07T03:00:00.000Z", "2020-09-08T03:00:00.000Z", "2020-09-09T03:00:00.000Z", "2020-09-10T03:00:00.000Z"]
    let res = await axios.get("users/messagesperday", {
      params: { id: 1 },
    });
    let date = res.data.map((ret) => {
      return ret.mes_date;
    });
    this.labels = date;

  },
  async mounted() {
    let res = await axios.get("users/messagesperday", {
      params: { id: 1 },
    });
    
    let qnt = res.data.map((ret) => {
      return ret.mes_messagesperday;
    });
    this.linedatasets[0].data = qnt;



  },
  computed: {},
  methods: {
    async getmessagesperday() {
    //   let res = await axios.get("users/messagesperday", {
    //     params: { id: 1 },
    //   });

      //this.groups = [20, 30, 18, 20, 30, 18, 500];

      
      // this.groups = res.data
      //console.log(res.data);
    //   res.data.map((groups) => {
        //console.log(groups);
    //     this.groups = groups;
    //   });
    //   console.log(this.groups);
    },
  },
};
</script>
<style scoped>
</style>
