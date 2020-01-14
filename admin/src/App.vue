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
  textarea{
    min-height: 80vh;
    &.el-textarea__inner{
      // border: none;
    }
  }
}
</style>
