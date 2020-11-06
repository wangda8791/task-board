import mutationType from "./mutationType";

export default {
  createCodingTask({ commit }, title) {
    commit(mutationType.CREATE_CODING_TASK, title);
  },
  updateCodingTask({ commit }, codingTask) {
    commit(mutationType.UPDATE_CODING_TASK, codingTask);
  },
  deleteCodingTask({ commit }, codingTask) {
    commit(mutationType.DELETE_CODING_TASK, codingTask.id);
  },
  setSuccessScore({ commit }, { codingTask, score }) {
    commit(mutationType.SET_SUCCESS_SCORE, { codingTask, score });
  },
  insertTaskTo({ commit }, { codingTask, title }) {
    commit(mutationType.INSERT_TASK_TO, { codingTask, title });
  },
  updateTaskOf({ commit }, { codingTask, task }) {
    commit(mutationType.UPDATE_TASK_OF, { codingTask, task });
  },
  deleteTaskFrom({ commit }, { codingTask, task }) {
    commit(mutationType.DELETE_TASK_FROM, { codingTask, task });
  }
};
