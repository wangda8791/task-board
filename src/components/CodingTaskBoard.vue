<template>
  <div>
    <h1>Coding Task Board</h1>
    <CodingTask />
  </div>
</template>

<script>
import CodingTask from "./CodingTask";

export default {
  name: "CodingTaskBoard",
  props: {},
  components: {
    CodingTask
  }
};
</script>

<style scoped lang="scss"></style>
