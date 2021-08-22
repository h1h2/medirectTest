<template>
  <b-row
    ><b-col>
      <b-row class="pr-0">
        <b-col>
          <chart></chart>
        </b-col>
      </b-row>
      <b-row class="pr-0">
        <b-col>
          <chart-tabs></chart-tabs>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import chart from "./chart.vue";
import chartTabs from "./chartTabs.vue";
export default {
  name: "chartArea",
  components: {
    chart,
    chartTabs,
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  watch: {},
  created() {},
};
</script>
<style scoped></style>
