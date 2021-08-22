<template>
  <div v-if="render">
    <b-tabs pills align="center">
      <b-tab
        title="15M"
        @click="updateChartData('15M')"
        title-link-class="tab"
      ></b-tab>
      <b-tab
        title="1H"
        @click="updateChartData('1H')"
        active
        title-link-class="tab"
      ></b-tab>
      <b-tab
        title="1D"
        @click="updateChartData('1D')"
        title-link-class="tab"
      ></b-tab>
      <b-tab
        title="1W"
        @click="updateChartData('1W')"
        title-link-class="tab"
      ></b-tab>
      <b-tab
        title="1M"
        @click="updateChartData('1M')"
        title-link-class="tab"
      ></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "chartTabs",
  data() {
    return {
      render: false,
    };
  },
  methods: {
    updateChartData: function(dateSelect) {
      let pastDate;
      let timeResolution;
      if (dateSelect === "15M") {
        pastDate = moment()
          .subtract(15, "m")
          .unix();
        timeResolution = 1;
      } else if (dateSelect === "1H") {
        pastDate = moment()
          .subtract(1, "H")
          .unix();
        timeResolution = 1;
      } else if (dateSelect === "1D") {
        pastDate = moment()
          .subtract(24, "h")
          .unix();
        timeResolution = 60;
      } else if (dateSelect === "1W") {
        pastDate = moment()
          .subtract(1, "w")
          .unix();
        timeResolution = 60;
      } else if (dateSelect === "1M") {
        pastDate = moment()
          .subtract(1, "M")
          .unix();
        timeResolution = "D";
      }
      if (this.$store.getters.getSymbol !== "") {
        this.$store.commit("setLoading", false);
        this.$finnhubClient.forexCandles(
          this.$store.getters.getSymbol,
          timeResolution,
          pastDate,
          moment().unix(),
          (error, data) => {
            this.$store.commit("setForexdata", data);
            this.$store.commit("setLoading", true);
          }
        );
      }
    },
  },
  watch: {
    symbol: function(symbol) {
      if (symbol === "") {
        this.render = false;
      } else {
        this.render = true;
      }
    },
  },
  computed: {
    ...mapGetters({
      symbol: "getSymbol",
    }),
  },
};
</script>
<style>
.tab {
  font-weight: bolder;
  color: gray !important;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  font-weight: bolder;
  background-color: rgba(0, 153, 255, 0.123) !important;
  color: black !important;
}
</style>
