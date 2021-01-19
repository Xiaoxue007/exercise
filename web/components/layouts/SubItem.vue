<template>
  <div class="subItem-box">
    <div class="subItem-content">
      <div v-for="(ul, index) in data" :key="index" class="subItem-list">
        <ul class="subItem-ul">
          <li class="subItem-li">
            <img
              src="https://static-cse.canva.cn/blob/192/swbg_thumbnail.png"
              alt=""
            />
          </li>
          <li class="subItem-li">
            <span class="subItem-span">
              <span style="font-weight: 700">{{ ul.name }}</span>
            </span>
          </li>
          <li v-for="(li, i) in ul.cats" :key="i" class="subItem-li">
            <a class="" href="#" draggable="false">
              <span class="Sbf1Gw">{{ li.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubItem',
  data() {
    return {
      data: {},
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.data = await this.$axios.$get('categories', {
        params: { where: { name: '竞赛' } },
      })
    },
  },
}
</script>

<style scoped>
.subItem-content {
  padding: 16px 8px 16px 24px;
  display: flex;
}
.subItem-list {
  width: 160px;
}
.subItem-ul {
  padding: 8px 0;
  width: 100%;
}
.subItem-li:first-child {
  height: 108px;
  padding: 0;
}
.subItem-li:nth-child(2) {
  height: 40px;
}
.subItem-li {
  padding: 0 8px;
  height: 32px;
  line-height: 1.6;
  display: flex;
  align-items: center;
}
.subItem-li img {
  border-radius: 8px;
  width: 144px;
  height: 108px;
  box-sizing: border-box;
}
.subItem-li a {
  height: 32px;
  display: inline-block;
  width: 100%;
  line-height: 32px;
  border-radius: 4px;
}
.subItem-li a:hover {
  background-color: rgba(64, 87, 109, 0.07);
  color: #0e1318;
}
.subItem-span {
  color: #0e1318;
  flex: 1;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 1.2em;
}
</style>
