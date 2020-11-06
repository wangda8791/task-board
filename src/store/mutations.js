import { v4 as uuidv4 } from "uuid";
import { storeState } from "./storageUtil";
import mutationType from "./mutationType";

export default {
  [mutationType.CREATE_CODING_TASK]: (state, title, editing = true) => {
    state.codingTasks = [
      ...state.codingTasks
        .filter(ct => ct.title.length > 0)
        .map(ct => ({ ...ct, editing: false })),
      { id: uuidv4(), title, editing, score: 0, tasks: [] }
    ];
    storeState(state);
  },
  [mutationType.UPDATE_CODING_TASK]: (state, { id, title }) => {
    const codingTask = state.codingTasks.find(ct => ct.id === id);
    if (codingTask) {
      codingTask.title = title;
      codingTask.editing = false;
    }
    storeState(state);
  },
  [mutationType.DELETE_CODING_TASK]: (state, id) => {
    state.codingTasks = state.codingTasks.filter(ct => ct.id !== id);
    storeState(state);
  },
  [mutationType.SET_SUCCESS_SCORE]: (state, { id, score }) => {
    const codingTask = state.codingTasks.find(ct => ct.id === id);
    if (codingTask) codingTask.score = Math.min(100, Math.max(0, score));
    storeState(state);
  },
  [mutationType.INSERT_TASK_TO]: (state, { codingTask, title }) => {
    const _codingTask = state.codingTasks.find(ct => ct.id === codingTask.id);
    if (_codingTask)
      codingTask.tasks = [...codingTask.tasks, { id: uuidv4(), title }];
    storeState(state);
  },
  [mutationType.UPDATE_TASK_OF]: (state, { codingTask, task }) => {
    const _codingTask = state.codingTasks.find(ct => ct.id === codingTask.id);
    if (_codingTask) {
      _codingTask.tasks = _codingTask.tasks.map(t => {
        if (t.id === task.id) return task;
        return t;
      });
    }
    storeState(state);
  },
  [mutationType.DELETE_TASK_FROM]: (state, { codingTask, id }) => {
    const _codingTask = state.codingTasks.find(ct => ct.id === codingTask.id);
    if (_codingTask)
      _codingTask.tasks = _codingTask.tasks.filter(t => t.id !== id);
    storeState(state);
  }
};
