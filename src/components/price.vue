<template>
  <div>
    <b-row>
      <div class="price-text">{{ currentPrice }}</div>
    </b-row>
    <b-row>
      <div :class="textColour">
        <b-icon class=" arrow" :icon="arrow" aria-hidden="true"></b-icon>
        <span class="price-changes">{{ priceDifference }}</span>
        <span class="price-changes">{{ percentageDifference }}</span>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "price",
  data() {
    return {
      currentPrice: null,
      priceDifference: null,
      percentageDifference: null,
      arrow: null,
      textColour: null,
    };
  },
  methods: {
    getCurrentPrice(forexData) {
      return parseFloat(forexData["c"][forexData["c"].length - 1]).toFixed(2);
    },
    setCurrentPrice(currentPrice) {
      let currSymbol = this.$store.getters.getCurrencySymbol;

      if (currSymbol === undefined) {
        currSymbol = "";
      }
      this.currentPrice = `${currSymbol}${currentPrice}`;
    },
    calculatePriceDifference(forexData) {
      let currentPrice = forexData["c"][forexData["c"].length - 1];
      let startingPrice = forexData["o"][forexData["o"].length - 1];
      return parseFloat(startingPrice - currentPrice).toFixed(2);
    },
    calculatePercentage(forexData) {
      let currentPrice = forexData["c"][forexData["c"].length - 1];
      let startingPrice = forexData["o"][forexData["o"].length - 1];
      let percent = parseFloat(
        100 - (currentPrice * 100) / startingPrice
      ).toFixed(2);

      return percent;
    },
  },
  watch: {
    forexData: function(forexData) {
      this.setCurrentPrice(this.getCurrentPrice(forexData));
      this.priceDifference = this.calculatePriceDifference(forexData);
      let percent = this.calculatePercentage(forexData);
      if (percent >= 0) {
        percent = `+${percent}`;
      }
      this.percentageDifference = ` (${percent}%)`;
    },
    priceDifference: function() {
      if (this.priceDifference >= 0) {
        this.arrow = "arrow-up-short";
        this.textColour = "text-colour-green";
      } else {
        this.arrow = "arrow-down-short";
        this.textColour = "text-colour-red";
      }
    },
  },
  computed: {
    ...mapGetters({
      forexData: "getForexData",
    }),
  },
  created() {},
};
</script>
<style scoped>
.text-colour-red {
  color: red;
}
.text-colour-green {
  color: green;
}

.price-text {
  font-size: 2vw;
  font-weight: bold;
}
.price-changes {
  font-size: 1vw;
  font-weight: bold;
}
.arrow {
  font-size: 1.25vw;
  font-weight: bolder;
}
</style>
