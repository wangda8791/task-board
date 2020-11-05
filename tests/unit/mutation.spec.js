import mutationType from "@/store/mutationType";
import mutations from "@/store/mutations";

describe("mutations", () => {
  const state = { codingTasks: [] };

  it(mutationType.CREATE_CODING_TASK, () => {
    mutations.CREATE_CODING_TASK(state, "CODING TASK 1");
    mutations.CREATE_CODING_TASK(state, "CODING TASK 2");

    expect(state.codingTasks).toHaveLength(2);
    expect(state.codingTasks[0].id).toBeDefined();
    expect(state.codingTasks[0].title).toBe("CODING TASK 1");
    expect(state.codingTasks[0].score).toBe(0);
    expect(state.codingTasks[0].tasks).toHaveLength(0);
  });

  it(mutationType.UPDATE_CODING_TASK, () => {
    expect(state.codingTasks.length).toBeGreaterThan(0);

    const prevState = JSON.parse(JSON.stringify(state));
    mutations.UPDATE_CODING_TASK(state, {
      ...state.codingTasks[0],
      id: "non existing id",
      title: "CODING TASK MODIFIED"
    });
    expect(state).toEqual(prevState);

    mutations.UPDATE_CODING_TASK(state, {
      ...state.codingTasks[0],
      title: "CODING TASK MODIFIED"
    });
    expect(state.codingTasks[0].title).toBe("CODING TASK MODIFIED");
  });

  it(mutationType.DELETE_CODING_TASK, () => {
    expect(state.codingTasks.length).toBeGreaterThan(0);
    const length = state.codingTasks.length;
    const id = state.codingTasks[0].id;

    const prevState = JSON.parse(JSON.stringify(state));
    mutations.DELETE_CODING_TASK(state, "non existing id");
    expect(state).toEqual(prevState);

    mutations.DELETE_CODING_TASK(state, id);
    expect(state.codingTasks.filter(ct => ct.id === id)).toHaveLength(0);
    expect(state.codingTasks.length).toBe(length - 1);
  });

  it(mutationType.SET_SUCCESS_SCORE, () => {
    expect(state.codingTasks.length).toBeGreaterThan(0);
    const id = state.codingTasks[0].id;

    const prevState = JSON.parse(JSON.stringify(state));
    mutations.SET_SUCCESS_SCORE(state, { id: "non existing id", score: 80 });
    expect(state).toEqual(prevState);

    mutations.SET_SUCCESS_SCORE(state, { id, score: -10 });
    expect(state.codingTasks[0].score).toBe(0);

    mutations.SET_SUCCESS_SCORE(state, { id, score: 50 });
    expect(state.codingTasks[0].score).toBe(50);

    mutations.SET_SUCCESS_SCORE(state, { id, score: 60 });
    expect(state.codingTasks[0].score).toBe(60);

    mutations.SET_SUCCESS_SCORE(state, { id, score: 120 });
    expect(state.codingTasks[0].score).toBe(100);
  });

  it(mutationType.INSERT_TASK_TO, () => {
    expect(state.codingTasks.length).toBeGreaterThan(0);

    const prevState = JSON.parse(JSON.stringify(state));
    mutations.INSERT_TASK_TO(state, {
      codingTask: { ...state.codingTasks[0], id: "non existing id" },
      title: "Task 1"
    });
    expect(state).toEqual(prevState);

    const length = state.codingTasks[0].tasks.length;
    mutations.INSERT_TASK_TO(state, {
      codingTask: state.codingTasks[0],
      title: "Task 1"
    });
    mutations.INSERT_TASK_TO(state, {
      codingTask: state.codingTasks[0],
      title: "Task 2"
    });
    expect(state.codingTasks[0].tasks.length).toBe(length + 2);
    expect(state.codingTasks[0].tasks[length].title).toBe("Task 1");
    expect(state.codingTasks[0].tasks[length + 1].title).toBe("Task 2");
  });

  it(mutationType.UPDATE_TASK_OF, () => {
    expect(state.codingTasks.length).toBeGreaterThan(0);
    expect(state.codingTasks[0].tasks.length).toBeGreaterThan(0);

    const codingTask = { ...state.codingTasks[0] };
    const task = { ...codingTask.tasks[0] };

    const prevState = JSON.parse(JSON.stringify(state));
    mutations.UPDATE_TASK_OF(state, {
      codingTask,
      task: { ...task, id: "non existing id", title: "Modified Task" }
    });
    expect(state).toEqual(prevState);

    mutations.UPDATE_TASK_OF(state, {
      codingTask,
      task: { ...task, title: "Modified Task" }
    });
    expect(state.codingTasks[0].tasks[0].title).toBe("Modified Task");
  });

  it(mutationType.DELETE_TASK_FROM, () => {
    expect(state.codingTasks.length).toBeGreaterThan(0);
    expect(state.codingTasks[0].tasks.length).toBeGreaterThan(0);
    const length = state.codingTasks[0].tasks.length;
    const id = state.codingTasks[0].tasks[0].id;

    const prevState = JSON.parse(JSON.stringify(state));
    mutations.DELETE_TASK_FROM(state, {
      codingTask: state.codingTasks[0],
      id: "non existing id"
    });
    expect(state).toEqual(prevState);

    mutations.DELETE_TASK_FROM(state, { codingTask: state.codingTasks[0], id });
    expect(state.codingTasks[0].tasks.filter(t => t.id === id)).toHaveLength(0);
    expect(state.codingTasks[0].tasks.length).toBe(length - 1);
  });
});
