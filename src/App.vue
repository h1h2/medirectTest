<template>
  <b-container id="app">
    <b-row>
      <b-col class="mb-5">
        <b-row><h1 class="main-header">Forex Exchange</h1> </b-row>
        <b-row
          ><h2 class="sub-header">
            Checkout the current price on different exchanges for currency pair
          </h2>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <priceChecker />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import priceChecker from "./components/priceChecker.vue";

export default {
  name: "App",
  components: {
    priceChecker,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap");
#app {
  height: 100vh;
  width: 100vw;
  font-family: "Lato", sans-serif;
  color: #2c3e50;
}
.main-header {
  font-weight: bolder;
  font-size: 6vw;
}
.sub-header {
  font-weight: bold;
  font-size: 2vw;
  color: gray;
}
</style>
