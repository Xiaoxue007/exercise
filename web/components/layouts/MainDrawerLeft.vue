<template>
  <div v-if="type === 'messageList'">
    <DrawerLeft :is-open="isOpen" title="消息列表" @close="close">
      <Input suffix="ios-search" placeholder="请输入搜索内容" />
      <MessageList />
    </DrawerLeft>
  </div>
  <div v-else-if="type === 'notification'">
    <DrawerLeft :is-open="isOpen" title="消息提醒" @close="close">
      <Menu mode="horizontal" theme="light" active-name="0">
        <MenuItem name="0">
          <Icon type="ios-construct" />
          我的提醒
        </MenuItem>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-stats" />
            组队消息
          </template>
          <MenuItem name="1-1">我的申请</MenuItem>
          <MenuItem name="1-2">加入我的</MenuItem>
        </Submenu>
      </Menu>

    </DrawerLeft>
  </div>
</template>

<script>
import DrawerLeft from '@/components/layouts/DrawerLeft'
import MessageList from '@/components/layouts/MessageList'

export default {
  name: 'MainDrawerLeft',
  components: {
    DrawerLeft,
    MessageList,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    type: String,
  },
  methods: {
    close(data){
      this.$emit('close',data)
    }
  }
}
</script>

<style scoped></style>
