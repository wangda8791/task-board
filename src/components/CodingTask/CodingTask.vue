<template>
  <ul
    class="ctb-codingtask"
    v-if="codingTask"
    @dblclick="$event => $event.stopPropagation()"
  >
    <li class="ctb-codingtask__header">
      <input
        ref="input"
        type="text"
        placeholder="New Coding Task"
        v-model="codingTask.title"
        v-if="codingTask.editing"
        @keyup.enter="onChanged"
        @keyup.esc="onBlur"
        @blur="onBlur"
      />
      <span v-else @dblclick="onEditTitle($event)">
        <i
          class="ctb-codingtask__status material-icons"
          :class="{
            'ctb-codingtask__status-low': codingTask.score < 30,
            'ctb-codingtask__status-medium':
              codingTask.score >= 30 && codingTask.score < 60,
            'ctb-codingtask__status-success': codingTask.score >= 60
          }"
          >verified</i
        >
        {{ codingTask.title }}
        <i class="ctb-codingtask__delete material-icons" @click="onDelete"
          >delete</i
        >
      </span>
    </li>
    <li class="ctb-codingtask__item">
      <Slider
        :value="codingTask.score"
        :level="{ low: 30, medium: 60, success: 100 }"
        :color="{ low: '#f03d3d', medium: '#f1f218', success: '#23c323' }"
        @change="onSuccessScoreChanged"
      />
    </li>
    <li
      class="ctb-codingtask__item"
      v-for="task in codingTask.tasks"
      :key="task.id"
    >
      <Task
        :data="task"
        @change="onTaskUpdate"
        @delete="onTaskDelete"
        @escape="onEscape"
      />
    </li>
    <li
      class="ctb-codingtask__item center"
      v-if="!codingTask.isNew && codingTask.tasks.length === 0"
    >
      <p class="pd-10">No Task.</p>
    </li>
    <li class="ctb-codingtask__footer" v-if="!codingTask.isNew">
      <button @click="onAddTask">
        <span class="button__icon">add</span>Add New Task
      </button>
    </li>
  </ul>
</template>

<script>
import Task from "@/components/Task";
import Slider from "@/objects/Slider";

export default {
  props: ["data"],
  components: {
    Task,
    Slider
  },
  data() {
    return {
      codingTask: null
    };
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        this.codingTask = JSON.parse(JSON.stringify(val));
      }
    }
  },
  mounted() {
    if (this.codingTask.editing) {
      this.$refs.input.focus();
    }
  },
  methods: {
    onEditTitle(e) {
      e.stopPropagation();
      this.codingTask.editing = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onChanged() {
      if (this.codingTask.title.length === 0) return;
      this.$emit("change", this.codingTask);
    },
    onBlur() {
      this.codingTask.editing = false;

      if (this.codingTask.title.length === 0) {
        if (this.codingTask.isNew) {
          this.onDelete();
        } else {
          this.codingTask.title = this.data.title;
        }
      } else {
        this.onChanged();
      }
    },
    onDelete() {
      this.$emit("delete", this.codingTask);
    },
    onSuccessScoreChanged(score) {
      this.$emit("change-success-score", this.codingTask, score);
    },
    onAddTask() {
      this.codingTask.tasks.push({
        id: -1,
        title: "",
        editing: true,
        isNew: true
      });
    },
    onTaskUpdate(task) {
      if (task.isNew) {
        this.$emit("task-add", this.codingTask, task);
      } else {
        this.$emit("task-change", this.codingTask, task);
      }
    },
    onTaskDelete(task) {
      this.$emit("task-delete", this.codingTask, task);
    },
    onEscape(task) {
      this.codingTask.tasks = this.codingTask.tasks.filter(
        t => t.id !== task.id
      );
    }
  }
};
</script>
