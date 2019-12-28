
<template>
    <div class="main">
        <el-container class="box">
            <Sidebar />
            <el-container class="content">
                <Header />
                <transition>
                    <router-view/>
                </transition>
            </el-container>
        </el-container>
    </div>
</template>
<style lang="scss">
  .main{
      .box{
          height: 100vh;
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
      
    },
    components: {
        Sidebar,
        Header
    }
  };
</script>