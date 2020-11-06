<template>
  <div class="ctb-task" v-if="task">
    <input
      ref="input"
      type="text"
      placeholder="Enter task title here..."
      v-model="task.title"
      v-if="task.editing"
      @keyup.enter="onChanged"
      @blur="onBlur"
    />
    <span v-else @dblclick="onEditTitle($event)">
      {{ task.title }}
      <i class="material-icons" @click="onDelete">delete</i>
    </span>
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
  mounted() {
    if (this.task.editing) {
      this.$refs.input.focus();
    }
  },
  methods: {
    onEditTitle(e) {
      e.stopPropagation();
      this.task.editing = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onChanged() {
      if (this.task.title.length === 0) return;
      this.$emit("change", this.task);
    },
    onBlur() {
      this.task.editing = false;
      if (this.task.title.length === 0) {
        if (this.task.isNew) {
          this.$emit("escape", this.task);
        } else {
          this.task.title = this.data.title;
        }
      } else {
        this.onChanged();
      }
    },
    onDelete() {
      this.$emit("delete", this.task);
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
    display: block;
    padding: 2px;
    width: 100%;
    position: relative;

    i {
      position: absolute;
      top: 0px;
      right: 0px;
      display: none;
    }

    &:hover i {
      display: block;
    }
  }
}
</style>
