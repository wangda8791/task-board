<template>
  <ul class="ctb-codingtask" v-if="codingTask">
    <li class="ctb-codingtask__header">
      <input
        type="text"
        v-model="codingTask.title"
        v-if="codingTask.editing"
        @keyup.enter="onChanged"
      />
      <span v-else @dblclick="codingTask.editing = true">{{
        codingTask.title
      }}</span>
    </li>
    <li
      class="ctb-codingtask__item"
      v-for="task in codingTask.tasks"
      :key="task.id"
    >
      <Task :data="task" />
    </li>
  </ul>
</template>

<script>
import Task from "../Task";

export default {
  props: ["data"],
  components: {
    Task
  },
  data() {
    return {
      codingTask: null
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.codingTask = val;
      }
    }
  },
  methods: {
    onChanged() {
      this.$emit("change", this.codingTask);
    }
  }
};
</script>

<style scoped lang="scss">
.ctb-codingtask {
  border: 1px solid lightgray;
  border-radius: 4px;
  box-shadow: 0 1px 3px #eeeeee86;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 6px;
    height: 30px;

    input {
      padding: 2px;
      outline: 0;
    }

    span {
      padding: 2px;
    }
  }
}
</style>
