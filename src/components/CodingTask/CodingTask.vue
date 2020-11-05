<template>
  <ul class="ctb-codingtask">
    <li class="ctb-codingtask__header"></li>
    <li class="ctb-codingtask__item">
      <Task />
    </li>
  </ul>
</template>

<script>
import Task from "../Task";

export default {
  components: {
    Task
  }
};
</script>

<style scoped lang="scss"></style>
