<template>
  <div>
    <div class="select-container">
      <b-form-select
        id="exchange"
        class="select"
        v-model="selectedExchange"
        :options="exchangeOptions"
      >
        <b-form-select-option :value="null"
          >Select Exchange</b-form-select-option
        >
      </b-form-select>
    </div>
    <div class="select-container">
      <b-form-select
        id="symbol"
        class="select"
        v-model="selectedSymbol"
        :options="symbolOptions"
      >
        <b-form-select-option :value="null">Select Symbol</b-form-select-option>
      </b-form-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "selection",
  data() {
    return {
      selectedExchange: null,
      selectedSymbol: null,
      exchangeOptions: [],
      symbolOptions: [],
    };
  },
  methods: {
    getExchange: function() {
      this.$finnhubClient.forexExchanges((error, data) => {
        this.exchangeOptions = data.map((item) => {
          return { value: item, text: item };
        });
      });
    },
    getSymbols: function() {
      this.$finnhubClient.forexSymbols(
        this.$store.getters.getExchange,
        (error, data) => {
          this.$store.commit("setSymbols", data);

          this.symbolOptions = data.map((item) => {
            return { value: item["symbol"], text: item["description"] };
          });
        }
      );
    },
  },
  watch: {
    selectedExchange: function(exchange) {
      if (exchange !== null || exchange !== undefined) {
        this.$store.commit("setExchange", exchange);
        this.getSymbols();
      }
    },
    selectedSymbol: function(symbol) {
      if (symbol !== null || symbol !== undefined) {
        this.$store.commit("setSymbol", symbol);
      }
    },
  },
  created() {
    this.getExchange();
  },
};
</script>
<style scoped>
.select-container {
  margin-bottom: 30px;
}
.select {
  margin: 0 auto;
  width: 100%;
  height: 35px;
  color: gray;
  border-color: gray;
  border-radius: 5px;
  align-content: c;
}
</style>
