<template>
  <div class="fullscreen" @dblclick="onNewCodingTask">
    <div class="header">
      <h1 class="disable-selection">Coding Task Board</h1>
      <small>Please double click board to add new coding task.</small>
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
            @change-success-score="onSuccessScoreChanged"
            @task-add="onTaskAdded"
            @task-change="onTaskChanged"
            @task-delete="onTaskDeleted"
          />
        </div>
        <div class="ct_grid_col center" v-if="codingTasks.length === 0">
          No coding task.
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="onNewCodingTask">
        <span class="button__icon">add</span>Add New Coding Task
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CodingTask from "./CodingTask";

export default {
  name: "CodingTaskBoard",
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
      "setSuccessScore",
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
    onSuccessScoreChanged(codingTask, score) {
      this.setSuccessScore({ codingTask, score });
    },
    onTaskAdded(codingTask, task) {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid lightgray;
  box-shadow: 1px 2px 3px #cccccc89;
  position: fixed;
  width: 100%;
  height: 100px;
  z-index: 1;

  h1 {
    margin-bottom: 0.5rem;
  }

  small {
    color: #333;
  }
}
.container {
  padding-top: 120px;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top: 1px solid lightgray;
  box-shadow: 1px -2px 3px #cccccc89;
  width: 100%;
  height: 50px;
}
</style>
