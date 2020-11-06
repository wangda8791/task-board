<template>
  <div ref="slider" class="slider">
    <div class="slider__bg">
      <div
        class="slider__segment"
        v-for="i in 10"
        :key="i"
        @click="onSetValue(i * 10)"
        @mousedown="onDragStarted"
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
      progress: 0,
      dragging: false
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
    },
    onDragStarted() {
      this.dragging = true;

      const body = document.querySelector("body");
      const slider = this.$refs.slider;

      const getOffsetLeft = elem => {
        var offsetLeft = 0;
        do {
          if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
          }
        } while ((elem = elem.offsetParent));
        return offsetLeft;
      };

      const sliderX = getOffsetLeft(slider);
      const sliderWidth = slider.clientWidth;

      const onDragging = e => {
        if (this.dragging) {
          let value;
          if (e.x < sliderX) value = 0;
          else if (e.x > sliderX + sliderWidth) value = 100;
          else value = Math.ceil(((e.x - sliderX) / sliderWidth) * 100);
          this.onSetValue(value);
        }
      };
      const onDraggingStop = () => {
        body.removeEventListener("mousemove", onDragging);
        body.addEventListener("mouseup", onDraggingStop);
      };
      body.addEventListener("mousemove", onDragging);
      body.addEventListener("mouseup", onDraggingStop);
    }
  }
};
</script>
