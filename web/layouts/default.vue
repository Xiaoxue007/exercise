<template>
  <!--  <div class="layout">-->
  <!--    <LayoutsSider-->
  <!--      @selectedMenu="selectedMenu"-->
  <!--      @LoginClick="LoginClick"-->
  <!--    ></LayoutsSider>-->

  <!--    <MainDrawerLeft :is-open="isOpen" :type="type" @close="closeDrawer" />-->

  <!--    <MainNavModal-->
  <!--      :type="modalType"-->
  <!--      :is-dialog="isDialog"-->
  <!--      @closeModal="closeModal"-->
  <!--      @changeType="changeType"-->
  <!--    ></MainNavModal>-->

  <!--    <Layout :style="{ marginLeft: '75px' }">-->
  <!--      <Header class="header">-->
  <!--        <a class="logo" href="https://www.canva.cn/">-->
  <!--          <span class="logo-graphic"></span>-->
  <!--        </a>-->

  <!--        <ul class="topNav-menu">-->
  <!--          <li class="topNav-item">-->
  <!--            <a href="#" class="topNav-link">-->
  <!--              <span class="topNav-text">首页</span>-->
  <!--            </a>-->
  <!--          </li>-->
  <!--          <li class="topNav-item">-->
  <!--            <a href="#" class="topNav-link">-->
  <!--              <span class="topNav-text"-->
  <!--                >竞赛中心 <Icon type="ios-arrow-down"-->
  <!--              /></span>-->
  <!--            </a>-->
  <!--            <SubItem />-->
  <!--          </li>-->
  <!--          <li class="topNav-item">-->
  <!--            <a href="#" class="topNav-link">-->
  <!--              <span class="topNav-text">课程中心</span>-->
  <!--            </a>-->
  <!--            <SubItem />-->
  <!--          </li>-->
  <!--          <li class="topNav-item">-->
  <!--            <a href="#" class="topNav-link">-->
  <!--              <span class="topNav-text">活动中心</span>-->
  <!--            </a>-->
  <!--            <SubItem />-->
  <!--          </li>-->
  <!--          <li class="topNav-item">-->
  <!--            <a href="#" class="topNav-link">-->
  <!--              <span class="topNav-text">我要组队</span>-->
  <!--            </a>-->
  <!--          </li>-->
  <!--        </ul>-->

  <!--        <Input-->
  <!--          search-->
  <!--          placeholder="你想了解什么竞赛?"-->
  <!--          style="width: 250px; flex-shrink: 0"-->
  <!--        />-->

  <!--        &lt;!&ndash;        <div id="nav-button" class="nav-button">&ndash;&gt;-->
  <!--        &lt;!&ndash;          <Button type="success" @click="LoginClick">&ndash;&gt;-->
  <!--        &lt;!&ndash;            <span class="topNav-text">请登录</span>&ndash;&gt;-->
  <!--        &lt;!&ndash;          </Button>&ndash;&gt;-->
  <!--        &lt;!&ndash;          <Button type="primary" @click="RegisterClick">&ndash;&gt;-->
  <!--        &lt;!&ndash;            <span class="topNav-text">注册</span>&ndash;&gt;-->
  <!--        &lt;!&ndash;          </Button>&ndash;&gt;-->
  <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
  <!--      </Header>-->
  <!--      <Content class="content">-->
  <!--        <nuxt-child />-->
  <!--      </Content>-->
  <!--    </Layout>-->
  <!--  </div>-->

  <Layout>
    <Header class="header">
      <Row type="flex" justify="space-between">
        <Col :xs="{ span: 0 }" :sm="{ span: 3 }">
          <a href="https://www.canva.cn/">
            <span class="logo-graphic"></span>
          </a>
        </Col>

        <Col :xs="{ span: 0 }" :xl="{ span: 10 }">
          <ul class="topNav-menu">
            <li class="topNav-item">
              <a href="#" class="topNav-link">
                <span class="topNav-text">首页</span>
              </a>
            </li>
            <li class="topNav-item">
              <a href="#" class="topNav-link">
                <span class="topNav-text"
                  >竞赛中心 <Icon type="ios-arrow-down"
                /></span>
              </a>
              <SubItem />
            </li>
            <li class="topNav-item">
              <a href="#" class="topNav-link">
                <span class="topNav-text">课程中心</span>
              </a>
              <SubItem />
            </li>
            <li class="topNav-item">
              <a href="#" class="topNav-link">
                <span class="topNav-text">活动中心</span>
              </a>
              <SubItem />
            </li>
            <li class="topNav-item">
              <a href="#" class="topNav-link">
                <span class="topNav-text">我要组队</span>
              </a>
            </li>
          </ul>
        </Col>

        <Col :xs="{ span: 19 }" :sm="10" :md="{ span: 10 }" :lg="5">
          <Input
            search
            placeholder="你想了解什么竞赛?"
            style="width: 100%; flex-shrink: 0"
          />
        </Col>

        <Col :xs="{ span: 0 }" :sm="{ span: 4 }">
          <div v-if="!this.$store.state.auth.user" id="nav-button">
            <Button ref="login" type="success" @click="LoginClick">
              <span class="topNav-text">请登录</span>
            </Button>
            <Button type="primary" @click="RegisterClick">
              <span class="topNav-text">注册</span>
            </Button>
          </div>
          <div v-else class="nav-avatar">
            <Avatar
              v-if="this.$store.state.auth.user.avatar"
              :src="this.$store.state.auth.user.avatar"
              size="large"
            ></Avatar>
            <Avatar
              v-else
              style="color: #f56a00; background-color: #fde3cf"
              size="large"
            >
              {{ $store.state.auth.user.username[0].toUpperCase() }}
            </Avatar>

            <Card
              title="Options"
              icon="ios-options"
              :padding="0"
              shadow
              class="nav-card"
            >
              <CellGroup>
                <Cell title="账户设置" to="/components/button" />
              </CellGroup>
              <CellGroup>
                <Cell title="我的消息" to="my/whisper" />
              </CellGroup>
              <CellGroup @on-click="logout">
                <Cell title="退出账户" />
              </CellGroup>
            </Card>
          </div>
        </Col>

        <Col :xs="{ span: 4 }" :sm="{ span: 1 }">
          <Button><Icon type="md-menu" /></Button>
        </Col>
      </Row>
    </Header>

    <Content class="content">
      <nuxt-child />
    </Content>

    <MainDrawerLeft :is-open="isOpen" :type="type" @close="closeDrawer" />

    <MainNavModal
      :type="modalType"
      :is-dialog="isDialog"
      @closeModal="closeModal"
      @changeType="changeType"
    ></MainNavModal>
  </Layout>
</template>
<script>
import MainDrawerLeft from '@/components/layouts/MainDrawerLeft'
import SubItem from '@/components/layouts/SubItem'
import MainNavModal from '@/components/layouts/MainNavModal'
import LayoutsSider from '@/components/layouts/LayoutsSider'
import eventBus from '@/plugins/eventBus.js'

export default {
  components: {
    MainDrawerLeft,
    SubItem,
    MainNavModal,
    LayoutsSider,
  },
  data() {
    return {
      cellSelected: '0',
      isOpen: false,
      isDialog: false,
      modalType: '',
    }
  },
  computed: {
    type() {
      if (this.cellSelected === '0') return 'messageList'
      else if (this.cellSelected === '1') return 'notification'
    },
  },
  mounted() {
    eventBus.$on('loginClick', () => {
      this.$refs.login.$el.click()
    })
  },
  methods: {
    async logout() {
      console.log('click')
      try {
        await this.$auth.logout()
      } catch (err) {
        this.$Message.success('退出登录')
      }
    },
    closeDrawer(data) {
      this.isOpen = data
    },
    closeModal(data) {
      this.isDialog = data
    },
    LoginClick() {
      this.isDialog = true
      this.modalType = 'login'
    },
    RegisterClick() {
      this.isDialog = true
      this.modalType = 'register'
    },
    changeType(data) {
      this.modalType = data
    },
    selectedMenu(name, status) {
      this.cellSelected = name
      this.isOpen = status
    },
  },
}
</script>

<style scoped>
.ivu-row {
  height: 100%;
  width: 100%;
  line-height: 56px;
}

.ivu-col {
  height: 100%;
}
</style>

<style scoped>
/*.header {*/
/*  position: fixed;*/
/*  width: calc(100% - 75px);*/
/*  background: #fff;*/
/*  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);*/
/*  padding: 4px 16px;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: space-around;*/
/*  z-index: 10;*/
/*  top: 0;*/
/*}*/

.header {
  position: fixed;
  width: 100vw;
  background: #fff;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
  padding: 0px 16px;
  z-index: 10;
  top: 0;
}

/*.layout {*/
/*  border: 1px solid #d7dde4;*/
/*  background: #f5f7f9;*/
/*  position: relative;*/
/*  border-radius: 4px;*/
/*  overflow: hidden;*/
/*}*/
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.logo-graphic {
  display: block;
  height: 56px;
  width: 140px;
  background-size: contain;
  background-image: url(../assets/img/logo.svg);
  background-repeat: no-repeat;
}

.topNav-menu {
  overflow-x: visible;
  position: relative;
  display: flex;
  height: 56px;
  contain: size layout;
  padding: 0 15px;
}
.topNav-link {
  padding: 8px 8px;
}
.topNav-text {
  font-size: 1.5rem;
  padding: 0 5px;
}

.subItem-box {
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  margin: 8px 0;
  left: -50px;
  top: 40px;
  box-shadow: 0 0 0 1px rgba(64, 87, 109, 0.07),
    0 2px 12px rgba(53, 71, 90, 0.2);
  display: none;
}

.topNav-item:hover .subItem-box {
  display: block;
}

.nav-avatar {
  float: right;
  width: 40px;
  cursor: pointer;
}

.nav-avatar:hover .nav-card {
  display: block;
}

.nav-card {
  width: 300px;
  position: absolute;
  top: 60px;
  right: 0;
  text-align: left;
  display: none;
}

.content {
  padding: 0 16px 16px;
  margin-top: 64px;
}
@media screen and (max-width: 500px) {
  .content {
    padding: 0;
  }
}
</style>

<style>
html {
  font-size: 62.5%;
}
ul {
  list-style: none;
}
a {
  color: #0e1318;
}
a:hover {
  color: #8b52ff;
}
#nav-button .ivu-btn-primary {
  background-color: #7d2ae8;
  border-color: #7d2ae8;
}
#nav-button .ivu-btn-primary:hover {
  background-color: #8d39fa;
  border-color: #8d39fa;
}
#nav-button .ivu-btn-success {
  background-color: rgba(64, 87, 109, 0.07);
  border-color: rgba(64, 87, 109, 0.07);
  color: #0e1318;
}
</style>
