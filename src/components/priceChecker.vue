<template>
  <b-row class="row" align-v="center">
    <b-col cols="3"> <selection></selection> </b-col>
    <b-col cols="9">
      <b-row>
        <chart-header></chart-header>
      </b-row>
      <b-row> <chart-area></chart-area></b-row>
    </b-col>
  </b-row>
</template>

<script>
import selection from "./selection.vue";
import chartHeader from "./chartHeader.vue";
import chartArea from "./chartArea.vue";
export default {
  name: "priceChecker",
  components: {
    selection,
    chartHeader,
    chartArea,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.chart-area {
  border-radius: 25px;
  box-shadow: 0px 0px 13px 9px rgba(197, 175, 175, 0.75);
  -webkit-box-shadow: 0px 0px 13px 9px rgba(197, 175, 175, 0.75);
  -moz-box-shadow: 0px 0px 13px 9px rgba(197, 175, 175, 0.75);

  min-width: 600px;
  min-height: 600px;
}
</style>
