<template>
    <div class="sidebar">
        <el-aside width="200px">
            <div class="sidebar-title">Anviz Admin</div>
            <LangSelect></LangSelect>
            <el-menu :default-active="$route.path" router>
                <el-menu-item index="/dashboard">
                    <i class="el-icon-setting"></i>
                    <span slot="title">Dashboard</span>
                </el-menu-item>
                <el-menu-item index="/tag">
                    <i class="el-icon-setting"></i>
                    <span slot="title">Tag</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
    </div>
</template>

<style lang="scss">
    .sidebar{
        .el-aside {
            height: 100%;
            color: #333;
            background-color: #222d32;
        }
        .el-menu{
            background-color: transparent;
        }
        .el-submenu__title,
        .el-menu-item{
            color: #b3c0d1;
            text-align: left;
        }
        .el-submenu__title,
        .el-menu-item{
            &:hover{
                color: #4b646f;
                background: #1a2226;
            }
        }
        .is-active{
            &:active,
            &:focus,
            &:visited{
                color: #4b646f;
                background: #1a2226;
            }
        }
        .sidebar-title{
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #367fa9;
            color: #fff;
            border-bottom: 0 solid transparent;
        }
    }
</style>

<script>
import LangSelect from '@/components/LangSelect.vue';

export default {
    data() {
      
    },
    components: {
        LangSelect
    }
  };
</script>
