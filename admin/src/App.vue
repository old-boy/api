<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
export default {
  name:"App"
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body{
  margin: 0;
  padding: 0;
  .text-left{
    text-align: left;
  }
  pre{
    white-space: pre-wrap;
  }
  .el-select{
    width: 100%;
  }
}
</style>
