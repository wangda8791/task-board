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
        {{ codingTask.title }}
        <i class="material-icons" @click="onDelete">delete</i>
      </span>
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

<style scoped lang="scss">
.ctb-codingtask {
  border: 1px solid lightgray;
  border-radius: 4px;
  box-shadow: 0 1px 3px #eeeeee86;

  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 3px;
    height: 30px;
    border-bottom: 1px solid lightgray;

    input {
      padding: 2px;
      outline: 0;
      width: 100%;
      text-align: center;
    }

    span {
      display: block;
      width: 100%;
      padding: 2px;
      position: relative;
      font-size: 1rem;
      font-weight: bold;

      i {
        position: absolute;
        top: 0px;
        right: 0px;
        display: none;
        font-size: 1.3rem;
      }

      &:hover i {
        display: block;
      }
    }
  }

  &__item {
    border-bottom: 1px dotted #ccc;

    &:last-child {
      border-bottom: 0;
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    border-top: 1px solid lightgray;

    button {
      width: 100%;
    }
  }
}
</style>
