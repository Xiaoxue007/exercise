<template>
  <Row ref="top" type="flex" justify="center" style="max-width: 100vw">
    <Col
      :sm="24"
      :md="24"
      :xl="18"
      style="background-color: #fff; display: flex"
    >
      <div class="left">
        <video width="100%" :src="episode.file" controls></video>
        <div class="title-box">
          <div>
            <h2 class="title">{{ course.name }}</h2>
            <div class="video-data">
              <span style="padding-right: 10px">12万播放</span>
              <Time :time="episode.createdAt" type="datetime"></Time>
            </div>
          </div>
          <div class="action">
            <LikeBtn
              icon="md-thumbs-up"
              name="like"
              size="28"
              type="Course"
              :object="id"
            ></LikeBtn>
            <LikeBtn
              style="padding-left: 5px"
              icon="md-star"
              name="collect"
              size="31"
              type="Course"
              :object="id"
            ></LikeBtn>
          </div>
        </div>

        <CommentList
          class="comment"
          style="background-color: #fff; padding: 0"
          type="Course"
          :object="id"
        ></CommentList>

        <div class="media">
          <div class="episodes">
            <ul class="multi-page">
              <li
                v-for="(ep, i) in course.episodes"
                :key="i"
                class="multi-page-list"
                :class="{ select: i === currentIndex }"
                @click="currentIndex = i"
              >
                <span class="multi-page-list-title">P{{ i + 1 }}-{{ ep.name }}</span>
              </li>
            </ul>
            <Icon type="ios-arrow-down" size="20" style="margin-left: 7px" />
          </div>

          <ul ref="title" class="nav">
            <li @click="commentClick">
              <span :class="{ select: this.switchIndex === 0 }">评论</span>
            </li>
            <li @click="recommendClick">
              <span :class="{ select: this.switchIndex === 1 }">相关推荐</span>
            </li>
            <div class="switcher-bottom"></div>
          </ul>
          <div ref="switch" class="switch">
            <div
              ref="comment"
              class="item"
              :class="{ current: this.switchIndex === 0 }"
              @touchstart="touchStart"
              @touchmove="commentMove"
              @touchend="touchEnd"
            >
              <CommentList type="Course" :object="id"></CommentList>
            </div>
            <div
              ref="recommend"
              style="transform: translateX(100%)"
              class="item recommend"
              :class="{ current: this.switchIndex === 1 }"
              @touchstart="touchStart"
              @touchmove="recommendMove"
              @touchend="touchEnd"
            >
              <Card
                v-for="(course, i) in recommends.data"
                :key="i"
                :bordered="false"
                :to="`/courses/${course._id}`"
                class="courses"
              >
                <img slot="title" :src="course.cover" />
                <div slot="title" class="hover-mask">
                  <img src="../../assets/img/index2.png" />
                </div>
                <span class="card-title">{{ course.name }}</span>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="multi-page-head">
          <span>视频选集</span>
          <Icon type="md-apps" size="20" />
          <Icon type="md-list" size="20" />
        </div>
        <ul class="multi-page">
          <li
            v-for="(ep, i) in course.episodes"
            :key="i"
            class="multi-page-list"
            :class="{ select: i === currentIndex }"
            @click="currentIndex = i"
          >
            <div class="time-axis"></div>
            <div v-if="i !== currentIndex" class="time-point"></div>
            <div v-if="i === currentIndex" class="time-live"></div>
            <span style="flex-shrink: 0">P{{ i + 1 }}</span>
            <span class="multi-page-list-title">{{ ep.name }}</span>
            <span style="flex-shrink: 0; margin-left: auto; color: #8d8d8d"
              >10:06</span
            >
          </li>
        </ul>
        <div>
          <h3 style="padding: 10px 0; font-weight: 500">更多视频推荐</h3>
          <a :href="course._id" v-for="(course, i) in recommends.data" :key="i">
            <div
              v-if="course._id !== id"
              style="display: flex; padding-bottom: 10px"
            >
              <img :src="course.cover" width="141" />
              <div
                style="margin-left: 10px; display: flex; flex-direction: column"
              >
                <span class="card-title">{{ course.name }}</span>
                <Time
                  :time="course.createdAt"
                  type="date"
                  style="color: #bfc1c4"
                ></Time>
                <span style="color: #bfc1c4">12万播放</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </Col>
  </Row>
</template>

<script>
export default {
  name: 'Id',
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' },
      },
    })
    const recommends = await $axios.$get('courses')
    return {
      id,
      course,
      recommends,
    }
  },
  data() {
    return {
      currentIndex: 0,
      switchIndex: 0,
      scrolling: false,
      startX: 0,
      currentX: 0,
      distance: 0,
      totalWidth: 0,
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    },
  },
  methods: {
    setTransform(obj, position, animDuration) {
      // 设置正在滚动
      this.scrolling = true
      obj.style.transition = 'transform ' + animDuration + 'ms'
      obj.style.transform = `translateX(${position}px)`
      obj.style['-webkit-transform'] = `translateX(${position}px)`
      obj.style['-ms-transform'] = `translateX(${position}px)`
      // 滚动完成
      this.scrolling = false
    },
    commentClick() {
      this.switchIndex = 0
      this.setTransform(this.$refs.comment, 0, 300)
      this.setTransform(
        this.$refs.recommend,
        this.$refs.recommend.scrollWidth,
        300
      )

      if (
        document.querySelector('html').scrollTop >
        this.$refs.switch.offsetTop - this.$refs.title.offsetHeight
      )
        document.querySelector('html').scrollTop =
          this.$refs.switch.offsetTop - this.$refs.title.offsetHeight
    },
    recommendClick() {
      this.switchIndex = 1
      this.setTransform(this.$refs.recommend, 0, 300)
      this.setTransform(
        this.$refs.comment,
        -this.$refs.comment.scrollWidth,
        300
      )

      if (
        document.querySelector('html').scrollTop >
        this.$refs.switch.offsetTop - this.$refs.title.offsetHeight
      )
        document.querySelector('html').scrollTop =
          this.$refs.switch.offsetTop - this.$refs.title.offsetHeight
    },
    touchStart(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return
      // 2.保存开始滚动的位置
      this.startX = e.touches[0].pageX
      this.totalWidth = this.$refs.comment.offsetWidth
    },
    commentMove(e) {
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX

      if (this.distance < 0) {
        const currentPosition2 = (this.switchIndex + 1) * this.totalWidth
        const moveDistance2 = this.distance + currentPosition2

        const currentPosition1 = -this.switchIndex * this.totalWidth
        const moveDistance1 = this.distance + currentPosition1
        this.setTransform(this.$refs.comment, moveDistance1, 0)
        this.setTransform(this.$refs.recommend, moveDistance2, 0)
      }
    },
    recommendMove(e) {
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX

      if (this.distance > 0) {
        const moveDistance2 = this.distance
        const currentPosition1 = -this.switchIndex * this.totalWidth
        const moveDistance1 = this.distance + currentPosition1

        this.setTransform(this.$refs.comment, moveDistance1, 0)
        this.setTransform(this.$refs.recommend, moveDistance2, 0)
      }
    },
    touchEnd(e) {
      // 1.获取移动的距离
      const currentMove = Math.abs(this.distance)

      // 2.判断最终的距离
      const moveRatio = 0.1
      if (this.distance === 0) {
        return
      } else if (this.switchIndex === 1) {
        // 右边移动超过0.1
        if (this.distance > 0 && currentMove > this.totalWidth * moveRatio) {
          this.switchIndex--
          this.setTransform(this.$refs.comment, 0, 300)
          this.setTransform(this.$refs.recommend, this.totalWidth, 300)
        } else {
          this.setTransform(this.$refs.comment, -this.totalWidth, 300)
          this.setTransform(this.$refs.recommend, 0, 300)
        }
      } else if (this.switchIndex === 0) {
        // 向左移动超过0.1
        if (this.distance < 0 && currentMove > this.totalWidth * moveRatio) {
          this.switchIndex++
          this.setTransform(this.$refs.comment, -this.totalWidth, 300)
          this.setTransform(this.$refs.recommend, 0, 300)
        } else {
          this.setTransform(this.$refs.comment, 0, 300)
          this.setTransform(this.$refs.recommend, this.totalWidth, 300)
        }
      }
      if (
        document.querySelector('html').scrollTop >
        this.$refs.switch.offsetTop - this.$refs.title.offsetHeight
      )
        document.querySelector('html').scrollTop =
          this.$refs.switch.offsetTop - this.$refs.title.offsetHeight
    },
  },
}
</script>

<style scoped>
.left {
  padding-left: 20px;
  padding-top: 45px;
  flex-grow: 1;
}
.title-box {
  display: flex;
}
.title {
  font-size: 1.8rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  /*white-space: nowrap;*/
  padding-top: 7px;
}
.video-data {
  height: 16px;
  color: #999;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 8px;
}
.action {
  margin-left: auto;
  flex-shrink: 0;
}
.right {
  width: 320px;
  margin: 45px 20px 0;
  flex-shrink: 0;
}
.time-axis {
  position: absolute;
  top: 0;
  height: 39px;
  left: 20px;
  border-left: 2px dotted #d4d4d4;
  z-index: 1;
}
.time-point {
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #ccc;
  border: 1px solid #cccccc;
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 2;
}
.time-live {
  position: absolute;
  top: 5px;
  left: 10px;
  width: 24px;
  height: 24px;
  background: url(../../assets/img/play.gif);
  z-index: 2;
}
.episodes {
  display: none;
}
.multi-page {
  background: #f4f4f4;
  position: relative;
  font-size: 1.3rem;
  padding-bottom: 5px;
  border-radius: 5px;
  max-height: 395px;
  overflow-y: auto;
}
.multi-page-head {
  padding: 10px 0 5px 20px;
  font-size: 1.7rem;
  background: #f4f4f4;
}
.multi-page-list {
  position: relative;
  padding: 10px 10px 10px 40px;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
}
.multi-page-list:hover {
  background-color: #fff;
  color: #23b8ff;
}
.multi-page-list:hover .time-point {
  background-color: #23b8ff;
  border-color: #23b8ff;
}
.multi-page-list-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 7px;
}
.select {
  background-color: #fff;
  color: #23b8ff;
}
.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 1.4rem;
  white-space: normal;
  height: 42px;
}
.media{
  display: none;
}
@media screen and (max-width: 800px) {
  .right {
    display: none;
  }
  .left {
    padding: 0 10px;
    /*padding: 0;*/
  }
  .title-box {
    display: block;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }
  .title {
    font-size: 1.5rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    /*white-space: nowrap;*/
  }
  .action i {
    color: blue;
    font-size: 20px !important;
  }
  .comment{
    display: none;
  }
  .episodes {
    display: flex;
    padding: 10px 0;
    width: calc(100vw - 20px);
    border-bottom: 1px solid #e0e0e0;
  }
  .multi-page {
    display: flex;
    flex-flow: row nowrap;
    overflow-x: auto;
    background-color: #fff;
    padding-bottom: 0;
  }
  .multi-page::-webkit-scrollbar {
    display: none;
  }
  .multi-page-list {
    padding: 1.3vw 2.4vw;
    font-size: 3.2vw;
    border: 1px solid #ccc;
    border-radius: 1vw;
    margin-right: 2vw;
  }
  .multi-page-list-title {
    width: 40vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: normal;
  }
  .select {
    border-color: #23b8ff;
  }
  .media{
    display: block;
  }
  .switcher-bottom {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0.53333vw;
    border-radius: 0.53333vw;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: width, height, transform;
    pointer-events: none;
    background: #23b8ff;
    width: 43.2812px;
    transform: translateX(141.547px);
    transition-duration: 300ms;
  }

  .courses {
    margin: 0 2px 2px 0;
    /*height: auto;*/
    transition: all 0.3s;
  }
  .courses:hover div {
    opacity: 1;
    transition: all 0.3s ease-out;
  }
  .courses:hover .ivu-card-head .hover-mask img {
    transform: scale(0.5);
  }
  .courses .ivu-card-head img {
    width: 100%;
    position: absolute;
    border-radius: 3px;
    height: 100%;
  }
  .courses div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: all 0.3s ease-out;
  }
  .courses .ivu-card-head .hover-mask img {
    width: 80px;
    height: 80px;
    position: absolute;
    left: 30%;
    top: 20%;
    transition: all 0.3s ease-out;
  }

  .nav {
    background-color: #fff;
    z-index: 2;
    position: sticky;
    top: 64px;
    display: flex;
    justify-content: space-around;
    height: 10vw;
    align-items: center;
    text-align: center;
    font-size: 3.8vw;
  }
  .nav li {
    width: 50%;
    height: 10vw;
  }
  .nav span {
    line-height: 10vw;
  }
  .switch {
    overflow: hidden;
    width: calc(100vw - 20px);
    position: relative;
    top: -10vw;
    margin-top: 10vw;
  }
  .item {
    position: absolute;
    will-change: transform;
    left: 0;
    right: 0;
    top: 0;
  }
  .current {
    position: relative;
  }
  .recommend {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: calc(100vw - 20px);
    flex-shrink: 0;
    scroll-snap-align: start;
    align-items: flex-start;
    align-content: flex-start;
  }
}
</style>

<style>
@media screen and (max-width: 800px) {
  .content {
    padding: 0 !important;
  }
  .courses .ivu-card-head {
    position: relative;
    height: 0;
    width: 45vw;
    padding: 0 0 56.25% 0;
  }
  .courses .ivu-card-body {
    width: 45vw;
    padding: 8px;
  }
}
</style>
