<template>
  <div>
    <Row type="flex" justify="center" style="max-width: 100%">
      <Col :xs="24" :md="18">
        <Carousel v-model="carouselIndex" autoplay loop class="carousel">
          <CarouselItem v-for="(item, index) in carouselImg" :key="index">
            <!--        <div class="carousel-item"></div>-->
            <img :src="item" />
          </CarouselItem>
        </Carousel>

        <Row type="flex" align="middle" class="title">
          <span class="card_icon" style="flex-shrink: 0"></span>
          <h2>推荐竞赛</h2>
          <Swiper style="width: calc(100% - 85px - 32px)">
            <li v-for="(cat, i) in compCats" :key="i" style="height: 27px">
              <span
                class="cat-name"
                :class="{ select: active[i] }"
                @click="changeCompCat(i)"
                >{{ cat.name }}</span
              >
            </li>
          </Swiper>
        </Row>

        <Swiper>
          <li v-for="(comp, index) in comps" :key="index">
            <Card :to="`/comps/${comp._id}`" class="comps">
              <img slot="title" :src="comp.cover" />
              <span class="card-title">{{ comp.name }}</span>
            </Card>
            <LikeBtn
              slot="extra"
              class="card-collect"
              icon="ios-heart"
              name="collect"
              type="Comp"
              :object="comp._id"
              :key="comp._id"
            ></LikeBtn>
          </li>
        </Swiper>

        <Row type="flex" justify="space-between">
          <Col :md="17" class="courses-box">
            <Row type="flex" class="title">
              <span class="card_icon"></span>
              <h2 style="padding-left: 5px">好课推荐</h2>
            </Row>

            <Card
              v-for="(course, i) in courses.data"
              :key="i"
              :bordered="false"
              :to="`/courses/${course._id}`"
              class="courses"
            >
              <img slot="title" :src="course.cover" />
              <div slot="title" class="hover-mask">
                <img src="../assets/img/index2.png">
              </div>
              <span class="card-title">{{ course.name }}</span>
            </Card>
          </Col>
          <Col :md="6" style="flex-shrink: 0; min-width: 300px">
            <Row type="flex" class="title">
              <span class="card_icon"></span>
              <h2 style="padding-left: 5px">推荐社区</h2>
            </Row>

          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import LikeBtn from '@/components/LikeBtn'
import Swiper from '@/components/Swiper'
import MessageList from '@/components/layouts/MessageList'

export default {
  components: {
    MessageList,
    Swiper,
    LikeBtn,
  },
  async asyncData({ $axios }) {
    const compCats = await $axios.$get('categories', {
      params: { where: { name: '竞赛' } },
    })
    const comps = await $axios.$get('comps/findByCat', {
      params: {
        where: {
          catId: compCats[0]._id,
        },
      },
    })
    const courses = await $axios.$get('courses')
    return {
      compCats,
      comps,
      courses,
    }
  },
  data() {
    return {
      carouselIndex: 0,
      carouselImg: [
        'https://qhxy.oss-cn-beijing.aliyuncs.com/%E7%BE%8E%E8%B5%9Bbanner.png',
        'https://qhxy.oss-cn-beijing.aliyuncs.com/%E7%BE%8E%E8%B5%9Bbanner.png',
      ],
      cardIndex: 0,
      // comps: [],
      // courses: [],
      courseImg: [],
      // Compcats: [],
      active: [true],
      tmp: [],
    }
  },
  // mounted() {
  //   this.fetchCompCats().then(() => this.fetchComps(0))
  //   this.fetch()
  // },
  methods: {
    async fetch() {
      this.courses = await this.$axios.$get('courses')

      this.courseImg = this.sliceArray(3, 6, this.courses.data)
    },
    async fetchComps(i) {
      this.comps = await this.$axios.$get('comps/findByCat', {
        params: {
          where: {
            catId: this.compCats[i]._id,
          },
        },
      })
    },
    sliceArray(items, total, array) {
      const pages = Math.ceil(total / items)
      const res = []
      for (let i = 0; i < pages; i++) {
        const temp = array.slice(i * items, i * items + items)
        res.push(temp)
      }
      return res
    },
    changeCompCat(i) {
      this.active = this.active.map(() => false)
      this.active[i] = true
      this.fetchComps(i)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.carousel {
  width: 100%;
}

/*.carousel-item{*/
/*  height: 350px;*/
/*  overflow: hidden;*/
/*  text-align: center;*/
/*  background-position: center 0;*/
/*  background-repeat: no-repeat;*/
/*  background-size: auto 100%;*/
/*  background-image: url(https://publicqn.saikr.com/8049a4aa44646b5ed80c58b20979dd011607515687495.png);*/
/*}*/

.carousel img {
  width: 100%;
}

.carouselCard img {
  width: 100%;
}

.title {
  padding: 15px 0;
  flex-wrap: nowrap;
  width: 100%;
}
.title h2 {
  padding-left: 5px;
  white-space: nowrap;
  font-size: 1.8rem;
  flex-shrink: 0;
}
.cat-name {
  cursor: pointer;
  padding: 0 5px 4px 5px;
}
.cat-name:hover {
  font-weight: bold;
}
.select {
  font-weight: bold;
  border-bottom: 2px solid #7d2ae8;
}
.comps {
  width: 285px;
}
.comps .ivu-card-head img {
  width: 255px;
}
.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 1.4rem;
  white-space: normal;
}
.card-collect {
  position: absolute;
  top: 3px;
  right: 0;
  z-index: 999;
}

.card_icon {
  width: 32px;
  height: 32px;
  background: url(../assets/img/index1.png) no-repeat;
  background-size: 100% 100%;
  flex-shrink: 0;
}

.courses-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1;
  height: 442px;
  overflow: hidden;
}
.courses {
  margin: 0 20px 20px 0;
  height: 172px;
  transition: all 0.3s;
}
.courses:hover {
  transform: translate(0, -5px);
}
.courses:hover div{
  /*display: block;*/
  opacity: 1;
  transition: all 0.3s ease-out;
}
.courses:hover .ivu-card-head .hover-mask img{
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
  background-color: rgba(0,0,0,.4);
  opacity: 0;
  transition: all 0.3s ease-out;
}
.courses .ivu-card-head .hover-mask img{
  width: 80px;
  height: 80px;
  position: absolute;
  left: 30%;
  top: 20%;
  transition: all 0.3s ease-out;
}
@media screen and (max-width: 500px) {
  .title {
    padding: 10px 0;
  }
  .card_icon {
    width: 25px;
    height: 25px;
  }
  .comps {
    width: 180px;
  }
  .comps .ivu-card-head img {
    width: 150px;
  }
  .courses-box {
    height: auto;
  }
  .courses {
    margin: 0 2px 2px 0;
    height: auto;
  }
}
</style>

<style>
.comps .ivu-card-head {
  padding: 15px 15px 0 15px;
}
.courses .ivu-card-head {
  position: relative;
  height: 0;
  width: 200px;
  padding: 0 0 56.25% 0;
}
.courses .ivu-card-body {
  width: 200px;
  padding: 8px;
}

@media screen and (max-width: 500px) {
  .comps .ivu-card-body {
    padding: 5px 15px;
  }

  .courses .ivu-card-head {
    position: relative;
    height: 0;
    width: 49vw;
    padding: 0 0 56.25% 0;
  }
  .courses .ivu-card-body {
    width: 49vw;
    padding: 8px;
  }
}
</style>
