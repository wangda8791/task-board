<template>
  <div
    class="ctb-task"
    v-if="task"
    @dblclick="$event => $event.stopPropagation()"
  >
    <input
      ref="input"
      type="text"
      placeholder="New Task..."
      v-model="task.title"
      v-if="task.editing"
      @keyup.enter="onChanged"
      @keyup.esc="onBlur"
      @blur="onBlur"
    />
    <span v-else @dblclick="onEditTitle($event)">
      {{ task.title }}
      <i
        class="ctb-task__edit material-icons"
        v-if="$isMobile"
        @click="onEditTitle($event)"
        >edit</i
      >
      <i class="ctb-task__delete material-icons" @click="onDelete">delete</i>
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
      this.$refs.input.blur();
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
        this.$emit("change", this.task);
      }
    },
    onDelete() {
      this.$emit("delete", this.task);
    }
  }
};
</script>
