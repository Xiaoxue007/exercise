<template>
  <div>

    <el-form ref="form" :model="fields.data" label-width="80px" inline="true">

      <el-form-item v-for="(form,index) in fields.forms" :label=form.label :key="index">
        <el-col :span="form.span || 24">
          <el-input v-if="!form.type" v-model="fields.data[`${form.prop}`]"></el-input>
        </el-col>

        <div v-if="form.type && form.type === 'uploadImg'">
          <UploadImg :src="fields.data[`${form.prop}`]" :is-file="fields.data[`${form.prop}`]?true:false"
                     :prop="`${form.prop}`" @updateFile="updateFile"/>
        </div>

        <el-select filterable v-if="form.type && form.type === 'select'" placeholder="请选择" v-model="fields.data[`${form.prop}`]" :multiple="form.sMulti || false">
            <el-option v-for="item in form.select" :key="item.label"
                       :label="item.label" :value="item.value"></el-option>
        </el-select>

        <div v-if="form.type && form.type === 'upload'">
          <UploadVideo :src="fields.data[`${form.prop}`]" :prop="`${form.prop}`"
                       :is-file="fields.data[`${form.prop}`]?true:false" @updateFile="updateFile"/>
        </div>

        <div v-if="form.type && form.type === 'textContent'">
          <VueEditor v-model="fields.data[`${form.prop}`]"></VueEditor>
        </div>

      <el-row v-if="form.type && form.type === 'dateTime'" type="flex" justify="space-between">
        <el-col :span="form.span || 11" >
          <el-date-picker type="date" placeholder="选择日期" v-model="fields.data[`${form.prop}`]" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col :span="form.span || 11">
          <el-time-picker placeholder="选择时间" v-model="fields.data[`${form.prop}`]" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-row>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(fields.data)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import UploadVideo from "@/components/UploadVideo";
import UploadImg from "@/components/UploadImg";
import { VueEditor } from "vue3-editor";

export default {
  name: "Edit",
  data(){
    return{
      resource: '',
      fields:{},
    }
  },
  components:{
    UploadVideo,
    UploadImg,
    VueEditor,
  },
  props:{
    isNew:Boolean,
    id:{
      type: String,
      default: ''
    }
  },
  created() {
    this.resource = this.$route.params.resource
    this.fetchField()
    !this.isNew && this.fetch()
    console.log(this.fields)
  },
  methods:{
    async onSubmit(data) {
      this.fields.data= {}
      console.log(data)
      const url = this.isNew? `${this.resource}` : `${this.resource}/${this.id}`
      const method = this.isNew? `post` : `put`
      await this.$http[method](url,data)
      this.$message.success('提交成功')
      this.$emit('dialogClose',false)
      // this.$router.go(-1)
    },
    async fetch(){
      const res = await this.$http.get(`${this.resource}/${this.id}`)
      this.fields.data = res.data;
    },
    async fetchField(){
      const res = await this.$http.get(`${this.resource}/field`)
      this.fields = res.data
      console.log(res.data)
    },
    updateFile(name,url){
      this.fields.data[name] = url
    }
  },
}
</script>

<style scoped>

</style>