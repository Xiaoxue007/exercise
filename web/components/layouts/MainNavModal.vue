<template>
  <NavModal
    :is-open="isDialog"
    :title="type === 'login' ? '登录你的账户' : '创建账户'"
    @closeModal="closeModal"
  >
    <NavModalLogin v-if="type === 'login'" @toRegister="changeType" @closeModal="closeModal"></NavModalLogin>
    <NavModalRegister v-if="type === 'register'" @toLogin="changeType" @closeModal="closeModal"></NavModalRegister>
  </NavModal>
</template>

<script>
import NavModal from '@/components/layouts/NavModal'
import NavModalLogin from '@/components/layouts/NavModalLogin'
import NavModalRegister from '@/components/layouts/NavModalRegister'

export default {
  name: 'MainNavModal',
  components: {
    NavModal,
    NavModalLogin,
    NavModalRegister,
  },
  props: {
    type: String,
    isDialog: Boolean,
  },
  data() {
    return {}
  },

  methods: {
    closeModal(data) {
      this.$emit('closeModal',data)
      // this.$Modal.remove()
    },
    changeType(data){
      this.$emit('changeType', data)
    },
  },
}
</script>

<style scoped></style>
