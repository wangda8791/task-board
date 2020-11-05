<template>
  <ul class="ctb-codingtask" v-if="codingTask">
    <li class="ctb-codingtask__header">
      <input
        type="text"
        :value="codingTask.title"
        v-if="editing"
        @keyup.enter="onChanged"
      />
      <span v-else @dblclick="editing = true">{{ codingTask.title }}</span>
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
      handler: val => {
        this.codingTask = val;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.ctb-codingtask {
  list-style-type: none;
  border: 1px solid lightgray;
  border-radius: 4px;
  box-shadow: 0 1px 3px #eeeeee86;

  &__header {
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
