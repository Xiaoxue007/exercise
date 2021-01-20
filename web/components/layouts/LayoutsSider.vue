<template>
  <Sider class="sider">
    <div class="list_avatar">
      <Button v-if="!this.$store.state.auth.user" @click="LoginClick"
        >登录</Button
      >
      <div v-else>
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
        <div class="list_avatar_show">
          <Icon type="md-settings" size="20" color="white" style="flex: 1" />
          <Icon
            type="ios-power"
            size="20"
            color="white"
            style="flex: 1"
            @click="logout"
          />
        </div>
      </div>
    </div>
    <Menu theme="dark" active-name="0" width="75px" @on-select="SelectedMenu">
      <MenuItem name="0">
        <Icon type="ios-chatbubbles-outline" size="20" color="white" />
      </MenuItem>
      <MenuItem name="1">
        <Icon type="md-notifications-outline" size="20" color="white" />
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-heart-outline" size="20" color="white" />
      </MenuItem>
    </Menu>
  </Sider>
</template>

<script>
export default {
  name: 'LayoutsSider',
  methods: {
    SelectedMenu(name) {
      this.$emit('selectedMenu', name, true)
    },
    LoginClick() {
      this.$emit('LoginClick')
    },
    async logout() {
      try {
        await this.$auth.logout()
      } catch (err) {
        this.$Message.success('退出登录')
      }
    },
  },
}
</script>

<style scoped>
.sider {
  position: fixed;
  height: 100vh;
  left: 0;
  overflow: auto;
  width: 75px !important;
  min-width: 75px !important;
}
.list_avatar {
  text-align: center;
  line-height: 64px;
}
.list_avatar:hover {
  cursor: pointer;
}
.list_avatar_show {
  display: flex;
  margin: 10px auto;
}
/*.list_avatar:hover div {*/
/*  display: flex;*/
/*  cursor: pointer;*/
/*}*/
</style>
