<template>
  <h3>系列列表</h3>

    <el-button type="success" size="small" @click="$router.push(`/create`)">添加系列</el-button>


  <el-table :data="data.data" border stripe>
    <el-table-column v-for="(field,name) in fields"
    :prop="name"
    :key="name"
    :label="field.label"
    :width="field.width">

    </el-table-column>
    <el-table-column label="操作" :width="200">
      <template v-slot="{row}">
        <el-button type="success" size="small" @click="$router.push(`/courses/edit/${row._id}`)">编辑</el-button>
        <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default{
  name: 'CourseList',
  data(){
    return{
      data:[],
      fields:{
        _id:{label: 'ID'},
        name:{label: '课程名称'},
        cover:{label: '封面图'},
      }
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    async fetch(){
      const res = await this.$http.get('courses')
      this.data = res.data
    },
    async remove(row){
      try{
        await this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        return
      }
      await this.$http.delete(`courses/${row._id}`)
      this.$message.success('删除成功')
      await this.fetch()
    }
  }

}
</script>

<style scoped>

</style>