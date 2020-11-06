<template>
  <ul class="ctb-codingtask" v-if="codingTask">
    <li class="ctb-codingtask__header">
      <input
        ref="input"
        type="text"
        v-model="codingTask.title"
        v-if="codingTask.editing"
        @keyup.enter="onChanged"
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
      <Task :data="task" />
    </li>
    <li class="ctb-codingtask__footer">
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
        this.codingTask = { ...val };
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
      console.log(this.codingTask);
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
    padding: 3px 3px;
    height: 30px;

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

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;

    button {
      width: 100%;
    }
  }
}
</style>
