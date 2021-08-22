<template>
  <b-row class="mt-1 mb-3">
    <b-row v-if="render">
      <b-col cols="4">
        <div class="cont">
          <div id="firstFlag" :class="firstFlag"></div>
          <div id="secondFlag" :class="secondFlag"></div>
          <p class="text-flag">{{ exchange }}</p>
        </div>
      </b-col>
      <b-col cols="5"></b-col>
      <b-col cols="3"></b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
        <div class="cont">
          <div class="text">{{ symbolDesc }}</div>
        </div>
      </b-col>
      <b-col cols="6"> </b-col>
      <b-col cols="3"
        ><b-row class="text-center">
          <b-col>
            <price></price>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import getSymbolFromCurrency from "currency-symbol-map";
import price from "./price.vue";
import moment from "moment";

export default {
  name: "chartHeader",
  components: {
    price,
  },
  data() {
    return {
      firstFlag: null,
      secondFlag: null,
      firstCurr: null,
      secondCurr: null,
      symbolDesc: null,
      exchange: null,
      render: false,
    };
  },
  methods: {
    setFlag(currency, flag) {
      if (flag === "firstFlag") {
        this.firstFlag = `first-flag currency-flag currency-flag-xl currency-flag-${currency} flag`;
      } else if (flag === "secondFlag") {
        this.secondFlag = `currency-flag currency-flag-xl currency-flag-${currency} flag`;
      }
    },
    getCurrency(symbolDesc, currNum) {
      if (currNum === 1) {
        return symbolDesc.substr(0, 3).toLowerCase();
      } else {
        return symbolDesc.substr(-3).toLowerCase();
      }
    },
  },
  watch: {
    symbol: function(symbol) {
      let symbolData = this.$store.getters.selectSymbol(symbol);
      if (symbolData !== null || symbolData !== undefined) {
        this.exchange = this.$store.getters.getExchange.toUpperCase();
        this.symbolDesc = symbolData["displaySymbol"];
        this.firstCurr = this.getCurrency(this.symbolDesc, 1);
        this.$store.commit("setBaseCurrency", this.firstCurr);
        this.$store.commit(
          "setCurrencySymbol",
          getSymbolFromCurrency(this.firstCurr.toUpperCase())
        );

        this.setFlag(this.firstCurr, "firstFlag");
        this.secondCurr = this.getCurrency(this.symbolDesc, 2);
        this.setFlag(this.secondCurr, "secondFlag");

        this.$store.commit("setLoading", false);
        this.$finnhubClient.forexCandles(
          this.$store.getters.getSymbol,
          "1",
          moment()
            .subtract(1, "hour")
            .unix(),
          moment().unix(),
          (error, data) => {
            this.$store.commit("setForexdata", data);
            this.$store.commit("setLoading", true);
            this.render = true;
          }
        );
      }
    },
  },
  computed: {
    ...mapGetters({
      symbol: "getSymbol",
    }),
  },
  created() {},
};
</script>
<style scoped>
.flag {
  min-height: 35px;
  min-width: 35px;
  max-height: 35px;
  max-width: 35px;
  display: inline-block;
  margin: 0;
  vertical-align: middle;
  border: lightgray 1px solid;
  border-radius: 50%;
  background-position: center;
}
.text-flag {
  display: inline-block;
  height: 100%;
  margin-left: 10px;
  padding: 2px 10px 2px 10px;

  text-align: center;
  font-size: 1vw;
  font-weight: bolder;
  border-radius: 20px;
  background-color: rgba(231, 227, 227, 0.774);
}
#secondFlag {
  margin-left: 5px;
}
.text {
  height: 100%;
  margin-left: 10px;
  font-size: 2vw;
  text-align: left;
  font-weight: bold;
}
.cont {
  margin-left: 20px;
}
</style>
