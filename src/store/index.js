import Vue from "vue";
import Vuex from "vuex";
import { uniqueId } from "lodash/uniqueId";
import mutationType from "./mutationType";

Vue.use(Vuex);

const INITIAL_STATE = {
  codingTasks: []
};

const storeState = state => {
  localStorage.setItem("STATE_TASK_BOARD", JSON.stringify(state));
};

const restoreState = () => {
  const state = localStorage.getItem("CODING_TASKS");
  if (state) return JSON.parse(state);
  return INITIAL_STATE;
};

const state = { ...restoreState() };

const mutations = {
  [mutationType.CREATE_CODING_TASK]: (state, title) => {
    state.codingTasks = [
      ...state.codingTasks,
      { id: uniqueId(), title, score: 0, tasks: [] }
    ];
    storeState(state);
  },
  [mutationType.UPDATE_CODING_TASK]: (state, { id, title }) => {
    const codingTask = state.codingTasks.find(ct => ct.id === id);
    if (codingTask) codingTask.title = title;
    storeState(state);
  },
  [mutationType.DELETE_CODING_TASK]: (state, id) => {
    state.codingTasks = state.codingTasks.filter(ct => ct.id !== id);
    storeState(state);
  },
  [mutationType.SET_SUCCESS_SCORE]: (state, { id, score }) => {
    const codingTask = state.codingTasks.find(ct => ct.id === id);
    if (codingTask) codingTask.score = score;
    storeState(state);
  },
  [mutationType.INSERT_TASK_TO]: (state, { codingTask, title }) => {
    const _codingTask = state.codingTasks.find(ct => ct.id === codingTask.id);
    if (_codingTask)
      codingTask.tasks = [...codingTask.tasks, { id: uniqueId(), title }];
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

const actions = {
  createCodingTask({ commit }, title) {
    commit(mutationType.CREATE_CODING_TASK, title);
  },
  updateCodingTask({ commit }, codingTask) {
    commit(mutationType.UPDATE_CODING_TASK, codingTask);
  },
  deleteCodingTask({ commit }, codingTask) {
    commit(mutationType.DELETE_CODING_TASK, codingTask.id);
  },
  setSuccessScore({ commit }, id, score) {
    commit(mutationType.SET_SUCCESS_SCORE, { id, score });
  },
  insertTaskTo({ commit }, codingTask, title) {
    commit(mutationType.INSERT_TASK_TO, { to: codingTask, title });
  },
  updateTaskOf({ commit }, codingTask, task) {
    commit(mutationType.UPDATE_TASK_OF, { codingTask, task });
  },
  deleteTaskFrom({ commit }, codingTask, task) {
    commit(mutationType.DELETE_TASK_FROM, { codingTask, task });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {}
});
