<template>
  <div class="ctb-task" v-if="task">
    <input
      ref="input"
      type="text"
      :value="task.title"
      v-if="task.editing"
      @keyup.enter="onChanged"
    />
    <span v-else @dblclick="onEditTitle($event)">{{ task.title }}</span>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      task: null
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
    onEditTitle() {
      this.task.editing = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onChanged() {
      this.task.editing = false;
    }
  }
};
</script>

<style scoped lang="scss">
.ctb-task {
  padding: 3px;

  input {
    padding: 2px;
    outline: 0;
    width: 100%;
  }

  span {
    padding: 2px;
  }
}
</style>
