<template>
  <div>
    <el-upload v-if="!isFile"
               :action="`${baseURL}/upload`" class="upload-demo"
               :on-success="function(res,file){return uploadSuccess(res,file,prop)}">
      <el-button size="small" type="success">点击上传</el-button>
      <!--          <div class="el-upload__tip" >只能上传jpg/png文件，且不超过500kb</div>-->
    </el-upload>

    <div v-if="isFile">
      <video
          style="width:50%;padding-right: 5px;"
          preload="auto"
          controls=""
          :src="src">
      </video>
      <el-upload
          :action="`${baseURL}/upload`" class="upload-demo"
          :on-success="function(res,file){return uploadSuccess(res,file,prop)}">
        <el-button type="success" icon="el-icon-refresh-right" circle></el-button>
        <!--          <div class="el-upload__tip" >只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
    </div>

  </div>
</template>

<script>

export default {
  name: "UploadVideo",
  props: {
    src: String,
    prop: String,
    isFile: Boolean
  },
  methods:{
    // 传出要改变的属性名name和内容url
    uploadSuccess(res,file,name){
      // this.fields.data[name] = file.response.url
      this.$emit('updateFile',name,file.response.url)
    },
  }
}
</script>

<style scoped>
.upload-demo{
  display: inline;
}
</style>