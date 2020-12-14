<template>
  <h3>{{isNew?'创建':'编辑'}}课程</h3>

  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="系列名称">
      <el-input v-model="form.name" placeholder="请输入系列名称"></el-input>
    </el-form-item>
    <el-form-item label="封面图">
      <el-input v-model="form.cover" placeholder="请上传封面图片"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit(form)">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CourseEdit",

  data(){
    return{
      form:{
        name: '',
        cover: '',
        episode: [],
      },
      fields:{
        name:{label: '课程名称',type: 'input'},
        cover:{label: '封面图', type: 'input'},
      }
    }
  },
  created() {
    !this.isNew && this.fetch()
  },
  methods:{
    async onSubmit(data) {
      this.form= {}
      console.log(data)
      const url = this.isNew? `courses` : `courses/${this.$route.params.id}`
      const method = this.isNew? `post` : `put`
      await this.$http[method](url,data)
      this.$message.success('提交成功')
      this.$router.go(-1)
    },
    async fetch(){
      const res = await this.$http.get(`courses/${this.$route.params.id}`)
      this.form = res.data;
    },
  },
  computed:{
    isNew(){
      return !this.$route.params.id
      // if(this.$route.params.id)
      //   return false
      // else
      //   return true
    }
  }
}
</script>

<style scoped>

</style>