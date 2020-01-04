<template>
    <div class="sidebar">
        <el-aside width="200px">
            <div class="sidebar-title">Anviz Admin</div>
            <LangSelect></LangSelect>
            <el-menu 
            default-active=""
            unique-opened
            collapse-transition
            router>
                <el-submenu v-for="item in sidebar" :index="item.id" :key="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span v-text="item.name"></span>
                    </template>
                    <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.componentName">
                        <el-menu-item :index="sub.componentName" v-text="sub.name"></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
    </div>
</template>
<script>
import LangSelect from '@/components/LangSelect.vue';
import sidebarArr from '../config/sidebar-config.js';

export default {
    name:"Sidebar",
    data() {
      return {
          title:"",
          sidebar:sidebarArr
      }
    },
    components: {
        LangSelect
    },
    methods: {
      
    }
  };
</script>
<style lang="scss">
    .sidebar{
        .el-aside {
            height: 100%;
            color: #333;
            background-color: #222d32;
        }
        .el-menu{
            background-color: transparent;
            border-right: 0;
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
        .el-menu-item-group__title{
            display: none;
        }
    }
</style>


