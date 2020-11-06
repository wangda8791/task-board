<template>
  <div class="ctb-task" v-if="task">
    <input
      type="text"
      :value="task.title"
      v-if="editing"
      @keyup.enter="onChanged"
    />
    <span v-else @dblclick="editing = true">{{ task.title }}</span>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      task: null,
      editing: false
    };
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        this.task = { ...val };
      }
    }
  },
  methods: {
    onChanged() {
      this.editing = false;
    }
  }
};
</script>

<style scoped lang="scss">
.ctb-task {
  padding: 3px 6px;

  input {
    padding: 2px;
    outline: 0;
  }

  span {
    padding: 2px;
  }
}
</style>