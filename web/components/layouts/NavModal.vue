<template>
  <Modal
    id="loginModal"
    :value="isOpen"
    :title="title"
    width="384"
    @on-visible-change="visibleChange"
  >
    <slot></slot>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
export default {
  name: 'NavModal',
  props: {
    title: String,
    isOpen: Boolean,
  },

  methods: {
    visibleChange(status) {
      if (status === false) {
        this.$emit('closeModal', false)
      }
    },

  },
}
</script>

<style>
#loginModal .ivu-modal-body {
  padding: 32px;
}
#loginModal .ivu-btn-primary {
  background-color: #7d2ae8;
  border-color: #7d2ae8;
  width: 100%;
  height: 40px;
}
#loginModal .ivu-modal-footer{
  border-top: 0px;
}
</style>
