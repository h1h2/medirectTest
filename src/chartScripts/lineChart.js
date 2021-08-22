import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      default: function() {
        return {
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  display: false,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
        };
      },
      type: Object,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
