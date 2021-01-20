<template>
  <span>
    <Icon
      :type="icon"
      :color="status ? 'red' : '#b1b3b6'"
      :name="name"
      class="icon"
      :size="size || 30"
      @click="toggle"
    />
    <span v-if="this.name === 'like'" style="color: #76839b">{{ cnt }}</span>
  </span>
</template>

<script>
export default {
  name: 'LikeBtn',
  props: {
    icon: String,
    name: String,
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
    size: String,
  },
  data() {
    return {
      status: false,
      cnt: 0,
    }
  },
  watch: {
    status: {
      handler: 'getStatus',
      immediate: true,
    },
  },
  methods: {
    async getStatus() {
      const res = await this.$axios.$get('actions/status', {
        params: {
          type: this.type,
          object: this.object,
          name: this.name,
        },
      })
      this.cnt = await this.$axios.$get('actions/count', {
        params: {
          type: this.type,
          object: this.object,
          name: this.name,
        },
      })
      this.status = res.status
    },
    async toggle() {
      try {
        const res = await this.$axios.$post('actions/toggle', {
          type: this.type,
          object: this.object,
          name: this.name,
        })
        this.status = res.status
      } catch (e) {
        this.$Message.warning('登陆后才能操作哦~')
      }
    },
  },
}
</script>

<style scoped>
.icon:hover {
  cursor: pointer;
}
</style>
