
<template>
    <div class="main">
        <el-container class="box">
            <Sidebar />
            <el-container class="content">
                <Header />
                <transition name="fade-transform" mode="out-in">
                    <router-view/>
                </transition>
            </el-container>
        </el-container>
    </div>
</template>
<style lang="scss">
  .main{
      height: 100vh;
      min-height: 100vh;

      .box{
          height: 100%;
          border: 1px solid #eee
      }
      .content{
          display: flex;
          flex-direction: column;
      }  
  }
</style>
<script>
    import Sidebar from '@/components/Sidebar.vue';
    import Header from '@/components/Header.vue';

  export default {
    data() {
      return {}
    },
    components: {
        Header,
        Sidebar
    }
  };
</script>