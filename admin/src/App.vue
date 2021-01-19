<template>
  <router-view/>
</template>

<style>
body{
  margin: 0;
}

.el-overlay{
  overflow: auto;
}

.el-upload--picture-card{
  width: 50%!important;
  padding-bottom: 28.125%;
  height: 0!important;
  overflow: hidden;
  position: relative;
}

.el-upload--picture-card i{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-upload{
  vertical-align: text-bottom;
}
</style>