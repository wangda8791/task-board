<template>
  <div id="app">
    <CodingTaskBoard />
  </div>
</template>

<script>
import CodingTaskBoard from "./components/CodingTaskBoard.vue";

export default {
  name: "App",
  components: {
    CodingTaskBoard
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
