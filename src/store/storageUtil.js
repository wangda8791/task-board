const INITIAL_STATE = {
  codingTasks: []
};

export const storeState = state => {
  localStorage.setItem("STATE_TASK_BOARD", JSON.stringify(state));
};

export const restoreState = () => {
  const state = localStorage.getItem("CODING_TASKS");
  if (state) return JSON.parse(state);
  return INITIAL_STATE;
};
