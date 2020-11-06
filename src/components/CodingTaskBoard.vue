<template>
  <div class="fullscreen" @dblclick="onNewCodingTask">
    <div class="header">
      <h1 class="disable-selection">Coding Task Board</h1>
    </div>
    <div class="container">
      <div class="ct_grid">
        <div
          class="ct_grid_col ct_grid__s6 ct_grid__m4 ct_grid__l3"
          v-for="ct in codingTasks"
          :key="ct.id"
        >
          <CodingTask
            :data="ct"
            @change="onCodingTaskChanged"
            @delete="onCodingTaskDelete"
            @task-add="onTaskAdded"
            @task-change="onTaskChanged"
            @task-delete="onTaskDeleted"
          />
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
    ...mapActions([
      "createCodingTask",
      "updateCodingTask",
      "deleteCodingTask",
      "insertTaskTo",
      "updateTaskOf",
      "deleteTaskFrom"
    ]),
    onNewCodingTask() {
      this.createCodingTask("");
    },
    onCodingTaskChanged(codingTask) {
      this.updateCodingTask(codingTask);
    },
    onCodingTaskDelete(codingTask) {
      this.deleteCodingTask(codingTask);
    },
    onTaskAdded(codingTask, task) {
      console.log(task);
      this.insertTaskTo({ codingTask, title: task.title });
    },
    onTaskChanged(codingTask, task) {
      this.updateTaskOf({ codingTask, task });
    },
    onTaskDeleted(codingTask, task) {
      this.deleteTaskFrom({ codingTask, task });
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
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 2rem;
}
.disable-selection {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
