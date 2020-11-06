<template>
  <div class="fullscreen" @dblclick="onNewCodingTask">
    <div class="header">
      <h1 class="disable-selection">Coding Task Board</h1>
    </div>
    <div class="container">
      <div class="ct_grid">
        <div
          class="ct_grid__s12 ct_grid__m4 ct_grid__l2"
          v-for="ct in codingTasks"
          :key="ct.id"
        >
          <CodingTask :data="ct" @change="onCodingTaskChanged" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapActions(["createCodingTask", "updateCodingTask"]),
    onNewCodingTask() {
      this.createCodingTask("");
    },
    onCodingTaskChanged(codingTask) {
      console.log(codingTask);
      this.updateCodingTask(codingTask);
    }
  }
};
</script>

<style scoped lang="scss">
.fullscreen {
  width: 100%;
  height: 100vh;
  overflow: auto;
  cursor: pointer;
}
.disable-selection {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
