<template>
  <line-chart class="chart" v-if="render" :chart-data="chartData"></line-chart>
</template>

<script>
import LineChart from "../chartScripts/lineChart";
import { mapGetters } from "vuex";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      render: false,
      chartData: {
        labels: null,
        datasets: [
          {
            data: null,
            fill: true,
            backgroundColor: "rgba(0,255,0,0.2)",
            borderColor: "rgba(57,162,57,1.0)",
            lineTension: 0,
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
  watch: {
    forexData: function(forexData) {
      this.chartData["datasets"][0]["data"] = forexData["c"];
      this.chartData["labels"] = forexData["t"];
    },
    loaded: function(loaded) {
      this.render = loaded;
    },
  },
  computed: {
    ...mapGetters({
      forexData: "getForexData",
    }),
    ...mapGetters({
      loaded: "isloaded",
    }),
  },
};
</script>

<style scoped>
.chart {
  min-height: 200px;
  max-height: 500px;
}
</style>
