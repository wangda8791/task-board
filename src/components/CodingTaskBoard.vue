<template>
  <div class="fullscreen" @click="onNewCodingTask">
    <div class="header">
      <h1>Coding Task Board</h1>
    </div>
    <div class="container">
      <div class="ct_grid">
        <div
          class="ct_grid__s12 ct_grid__m4 ct_grid__m2"
          v-for="ct in codingTasks"
          :key="ct.id"
        >
          <CodingTask :data="ct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CodingTask from "./CodingTask";

export default {
  name: "CodingTaskBoard",
  props: {},
  components: {
    CodingTask
  },
  computed: {
    ...mapGetters(["codingTasks"])
  },
  methods: {
    onNewCodingTask() {}
  }
};
</script>

<style scoped lang="scss">
.fullscreen {
  width: 100%;
  height: 100vh;
  overflow: auto;
}
</style>
