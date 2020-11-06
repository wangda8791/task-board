<template>
  <div class="slider">
    <div class="slider__bg">
      <div
        class="slider__segment"
        v-for="i in 10"
        :key="i"
        @click="onSetValue(i * 10)"
      >
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
      return width;
    }
  },
  methods: {
    onSetValue(value) {
      this.$emit("change", value);
    }
  }
};
</script>
