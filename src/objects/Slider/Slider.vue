<template>
  <div class="slider">
    <div class="slider__bg">
      <div class="slider__segment" v-for="i in 10" :key="i">
        <div class="slider__progress" :style="{ width: width[i - 1] }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      progress: 0
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.progress = val;
      }
    }
  },
  computed: {
    width() {
      const width = new Array(10).fill(0);
      for (let i = 0; i < 10; i++) {
        width[i] = `${Math.max(0, Math.min(10, this.progress - i * 10)) * 10}%`;
      }
      console.log(width);
      return width;
    }
  }
};
</script>

<style lang="scss">
.slider {
  &__bg {
    display: flex;
    background-color: transparent;
    padding: 2px;
    position: relative;
  }

  &__segment {
    background-color: lightgray;
    border-radius: 2px;
    margin-right: 1px;
    overflow: hidden;
    width: 100px;
    height: 6px;

    &:last-child {
      margin-right: 0px;
    }
  }

  &__progress {
    background-color: green;
    height: 100%;
  }
}
</style>