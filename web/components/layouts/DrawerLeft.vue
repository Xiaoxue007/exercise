<template>
  <Drawer
    id="dialog"
    :value="isOpen"
    :title="title"
    placement="left"
    width="300px"
    @on-close="closeDrawer"
  >
    <slot></slot>
  </Drawer>
</template>

<script>
export default {
  name: 'DrawerLeft',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: String,
  },
  data() {
    return {
      cellSelected: '',
    }
  },
  methods: {
    closeDrawer(){
      this.$emit('close',false)
    }
  }
}
</script>

<style>
#dialog .ivu-drawer-mask {
  background-color: transparent;
}
#dialog .ivu-drawer-left {
  left: 75px;
  top: 65px;
}
#dialog .ivu-drawer-content {
  height: calc(100vh - 64px);
  width: 300px;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #d8d8d8;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #bfc1c4;
}
</style>
