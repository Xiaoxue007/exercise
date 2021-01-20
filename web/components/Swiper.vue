<template>
  <div>
    <div class="box">
      <div class="button" @click="left">
        <Button
          v-show="showLeft"
          shape="circle"
          icon="ios-arrow-back"
          type="text"
        ></Button>
      </div>

      <ul ref="list" class="list" @scroll="isScroll">
        <slot></slot>
      </ul>

      <div class="button" @click="right">
        <Button
          v-show="showRight"
          shape="circle"
          icon="ios-arrow-forward"
          type="text"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  data() {
    return {
      sLeft: 0,
      width: 0,
      t1: 0,
      t2: 0,
      timer: null,
    }
  },
  computed: {
    showLeft() {
      return this.sLeft > 0
    },
    showRight() {
      return Math.ceil(this.sLeft) < this.totalWidth - this.width
    },
  },
  mounted() {
    this.el = this.$refs.list
    this.sLeft = this.el.scrollLeft
  },
  updated() {
    this.width = this.el.offsetWidth
    this.totalWidth = this.el.scrollWidth
  },
  methods: {
    left() {
      const out = this.el.scrollLeft
      this.el.scroll({
        left: out - this.width,
        top: 0,
        behavior: 'smooth',
      })
    },
    right() {
      const out = this.el.scrollLeft
      this.el.scroll({ left: out + this.width, top: 0, behavior: 'smooth' })
    },
    isScroll() {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.isScrollEnd, 200)
      this.t1 = this.$refs.list.scrollLeft
    },
    isScrollEnd() {
      this.t2 = this.$refs.list.scrollLeft
      if (this.t1 === this.t2) {
        this.sLeft = this.t2
        this.width = this.el.offsetWidth
        this.totalWidth = this.el.scrollWidth
      }
    },
  },
}
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
  padding: 0 5px;
  box-sizing: border-box;
  overflow: hidden;
}
.button {
  flex-shrink: 0;
  flex-basis: 32px;
}
.list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  margin: 0px 5px;
  padding: 3px 0px;
  font-size: 1.5rem;
}

.list::-webkit-scrollbar {
  display: none;
}
.list li {
  position: relative;
  margin-left: 24px;
  white-space: nowrap;
  scroll-snap-align: start;
  height: 100%;
}
.list li:first-child {
  margin-left: 0px;
}
</style>
