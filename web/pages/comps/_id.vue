<template>
  <div>
    <Row type="flex" justify="center">
      <Col :xs="24" :md="18">
        <img :src="comp.banner" width="100%" />
        <div class="date">
          距离报名截止还有
          <span style="color: #b1ff63">
            {{ offsetDate(comp.rDateEd) }}
          </span>
          天
        </div>
        <div id="detail" class="nav">
          <Menu mode="horizontal" active-name="1">
            <MenuItem name="1" to="#content">
              <Icon type="ios-paper" />
              竞赛详情
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-people" />
              通知公告
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-construct" />
              评论区
            </MenuItem>
          </Menu>
        </div>

        <Row type="flex" justify="space-between" class="content">
          <Col id="content" :md="16">
            <h2 class="content-title">{{ comp.name }}</h2>
            <div class="content-html" v-html="comp.content"></div>
          </Col>

          <Col :md="7" style="background-color: #fff">
            <List item-layout="vertical">
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">级别</span>
                <span>{{ comp.level }}</span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">参赛对象</span>
                <span>{{ comp.obj }}</span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">类型</span>
                <span>{{ comp.type }}</span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">报名费</span>
                <span>{{ comp.fee }}</span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">报名时间</span>
                <span>
                  {{ dateFormat(comp.rDateSt) }} -
                  {{ dateFormat(comp.rDateEd) }}
                </span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">比赛时间</span>
                <span>
                  {{ dateFormat(comp.mDateSt) }} -
                  {{ dateFormat(comp.mDateEd) }}
                </span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">评奖</span>
                <span v-for="item in comp.award">{{ item }}</span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">竞赛类别</span>
                <span v-for="item in comp.category">{{ item.name }} </span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">主办方</span>
                <span>{{ comp.sponsor }}</span>
              </ListItem>
              <ListItem>
                <Icon type="ios-body" color="#4d83ff" size="20" />
                <span class="content-list-item">关注竞赛</span>
                <LikeBtn icon="ios-heart" type="Comp" :object="id" size="20" name="collect"></LikeBtn>
              </ListItem>
            </List>
          </Col>
        </Row>

        <Row type="flex" justify="space-between" class="content">
          <Col span="24">
            <h1>评论区</h1>
            <CommentList type="Comp" :object="id"></CommentList>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
export default {
  components: { CommentList },
  async asyncData({ params, $axios }) {
    const { id } = params
    const comp = await $axios.$get(`comps/${id}`, {
      params: {
        query: { populate: 'category' },
      },
    })
    return {
      id,
      comp,
    }
  },
  methods: {
    dateFormat(data) {
      let date = new Date(data)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minute >= 0 && minute <= 9) {
        minute = '0' + minute
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      date = year + '年' + month + '月' + day + '日' + hour + ':' + minute + ':' + second
      return date
    },
    offsetDate(d) {
      const date = new Date(d)
      const now = new Date()
      const diff = parseInt((date - now) / (1000 * 60 * 60 * 24))

      return diff
    },
  },
}
</script>

<style scoped>
.date {
  position: absolute;
  width: 25rem;
  height: 4rem;
  line-height: 3.5rem;
  top: 3rem;
  right: -0.6rem;
  z-index: 1;
  background: url(../../assets/img/slogan.png) no-repeat;
  background-size: 100%;
  text-indent: 3rem;
  font-size: 1.8rem;
  color: #fff;
}
.nav {
  position: relative;
  font-weight: 600;
  font-size: 1.4rem;
}
.nav-time {
  position: absolute;
  top: 2px;
  right: 0;
}
.content {
  padding: 20px;
  background-color: #fff;
}
.content-title {
  font-size: 2rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.content-html {
  padding: 2rem 0;
}
.content-list-item {
  font-weight: bold;
  padding-right: 10px;
}
</style>

<style>
#detail .ivu-menu {
  z-index: 0;
}
#detail .ivu-menu-item {
  font-size: 1.5rem;
  font-weight: 600;
}

@media screen and (max-width: 700px) {
  .date {
    display: none;
  }
}

@media screen and (max-width: 500px) {
  #detail .ivu-menu-horizontal .ivu-menu-item,
  .ivu-menu-horizontal .ivu-menu-submenu {
    padding: 0 0.5rem;
    height: 3rem;
    line-height: 3rem;
  }

  #detail .ivu-menu-horizontal {
    height: 3rem;
    line-height: 3rem;
  }
}
</style>
