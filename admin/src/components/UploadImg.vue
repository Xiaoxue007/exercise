<template>
  <div>
    <el-upload  list-type="picture-card"
                :action="`${baseURL}/upload`" :show-file-list="false"
                :on-success="function(res,file){return uploadSuccess(res,file,prop)}">
      <div class="show" v-if="isFile">
        <img :src="src" >
        <div class="edit">
          <i class="el-icon-refresh-right"></i>
        </div>
      </div>
      <i v-else class="el-icon-plus"></i>
      <div class="el-upload__tip" >只能上传jpg/png文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "UploadImg",
  props: {
    isFile: Boolean,
    src: String,
    prop: String
  },
  methods: {
    uploadSuccess(res,file,name){
      this.$emit('updateFile',name,file.response.url)
    },
  }
}
</script>

<style scoped>
  .el-upload img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .edit{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: .5;
    background: #ffffff;
    display: none;
  }

  .show{
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    position: relative;
  }

  .show:hover div{
    display: block;
  }
</style>