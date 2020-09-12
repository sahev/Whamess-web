<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  watch: {
    chartData: function (newVal) {
      const dates = newVal.map((d) => d.date).reverse();
      const totals = newVal.map((d) => d.total).reverse();

      this.renderChart(
        {
          labels: dates,
          datasets: [
            {
              label: this.label,
              data: totals,
              backgroundColor: [
                "rgba(71, 183,132,.4)", // Green
              ],
            },
          ],
        },
        this.options
      );
    },
  },
};
</script>