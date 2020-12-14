<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" style="height: 100vh" :default-active="$route.path" router>
        <el-submenu v-for="(item,index) in menu.items" :key="`menu-item-${index}`"
                    :index="index+1" >
          <template v-slot:title>{{item.title}}</template>

          <el-menu-item v-for="(subItem,subIndex) in item.items" :key="`menu-item-${index}-${subIndex}`"
                        :index="subItem.path">
            {{subItem.title}}
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align:left">
        <h2>后台管理界面</h2>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
  data() {
    return{
      menu: {
        items: [
          {
            title: '内容管理',
            items: [
              {title: '首页',path: '/'},
              {title: '系列管理',path: '/courses/list'},
              {title: '视频管理',path: '/episodes/list'},
            ]
          },
          {
            title: '运营管理',
            items: [
              {title: '用户管理',path: '/users/list'},
            ]
          }
        ]
      },


    }
  },

}
</script>

<style scoped>

</style>