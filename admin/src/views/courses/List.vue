<template>

    <h3>{{form.title}}</h3>

<!--    <el-button type="success" size="small" @click="$router.push(`/${resource}/create`)">添加{{form.name}}</el-button>-->
    <el-button type="success" size="small" @click="editForm()">添加{{form.name}}</el-button>
<!--  <el-button type="success" size="small" @click="editForm(row._id)">编辑</el-button>-->

    <el-form v-for="(field,name) in form.fields" :key="name">
      <el-form-item  v-if="field.search" :label="field.label">:
        <el-input clearable v-model="search[name]" @keyup.enter="searchChange(name)" style="width: 300px" :placeholder="`搜索${field.label}`"></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchChange(name)">搜索</el-button>
      </el-form-item>
    </el-form>

    <div v-if="form">
      <el-table :data="data.data"  @sort-change="sortChange" border stripe  style="width: 90%">
        <el-table-column v-for="(field,name) in form.fields" :key="name" :label="field.label"
                         :sortable="field.sortable" :prop="name" >
          <template v-if="field.type"  v-slot="scope" >
            <el-image v-if="field.type === 'img'"
                      style="height: 96px" fit="contain" :src="scope.row[name]" :preview-src-list="[scope.row[name]]">
            </el-image>

            <video v-if="field.type =='video'"
                style="height: 96px" preload="auto" controls="" :src="scope.row[name]">
            </video>

            <p v-if="field.type =='label'">
              {{scope.row[name].name}}
            </p>
          </template>
        </el-table-column>


        <el-table-column label="操作" :width="200">
          <template v-slot="{row}">
            <el-button type="success" size="small" @click="editForm(row._id)">编辑</el-button>
<!--            <el-button type="success" size="small" @click="$router.push(`/${resource}/edit/${row._id}`)">编辑</el-button>-->
            <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page=page.current :page-sizes=page.pageSizes
                     :page-size=page.pageSize :total=page.total>
      </el-pagination>

      <el-dialog :title="id?'编辑':'创建'" v-model="isEditForm" v-if="isEditForm" class="edit">
        <Edit :is-new="id?false:true" :id="id" @dialogClose="dialogClose()"/>
      </el-dialog>

    </div>

</template>

<script>
import Edit from './Edit'

export default{

  name: 'CourseCrud',
  components:{
    Edit
  },
  data(){
    return{
      resource: '',
      data:[],
      form: {},
      search: {},
      page: {
        current: 1,
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 10,
        total:10,
      },
      query: {
        limit: 10,
        where: {},
        populate: ''
      },
      isEditForm: false,
      id:'',
    }
  },
  computed:{

  },
  created(){
    this.resource = this.$route.params.resource
    this.fetchForm()
    this.fetch()
  },
  methods:{
    /**
     * 网络请求相关的方法
     */
    async fetch(){
      if(this.resource === 'episodes')
        this.query.populate = 'course'
      const res = await this.$http.get(`${this.resource}`, {
        params: {
          query: this.query
        }
      })
      this.data = res.data
      this.page.total = this.data.total
      console.log(this.data)
    },
    async fetchForm(){
      const res = await this.$http.get(`${this.resource}/form`)
      this.form = res.data
      console.log(this.form)
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
      await this.$http.delete(`${this.resource}/${row._id}`)
      this.$message.success('删除成功')
      await this.fetch()
    },
    /**
     * 处理监听的方法
     */
    async handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.query.limit = val
      await this.fetch()
    },
    async handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.query.page = val
      await this.fetch()
    },
    async sortChange({ prop,order }){
      if(!order){
        this.query.sort = null
      }else{
        this.query.sort = {
          [prop]:order === 'ascending'? 1 : -1
        }
      }
      await this.fetch()
    },
    async searchChange(name){
      let search
      if(this.form.fields[name].regex){
         search = { $regex: this.search[name]}
      }
      this.query.where[name] = search
      await this.fetch()
    },
    editForm(id){
      this.id = id
      this.isEditForm = true
    },
    dialogClose(){
      this.isEditForm = false
      this.fetch()
    }

  }

}
</script>

<style scoped>
  .el-dialog__body img{
    width: 100%;
  }

  .edit{
    width: 70%;
    height: 80%;
  }
</style>