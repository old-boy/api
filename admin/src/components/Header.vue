<template>
    <el-header class="header">
        <span>王小虎</span>
        <el-dropdown>
            <i class="el-icon-caret-bottom" style="margin-left: 15px;color:#fff;"></i>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>My Profile</el-dropdown-item>
            <el-dropdown-item>Modify Password</el-dropdown-item>
            <el-dropdown-item>Log Off</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>
<script>
export default {
   data() {
      
    },
}
</script>
<style lang="scss">
    .header{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-shrink: 0;
        background-color: #3c8dbc;
        span{
            color: #fff;
        }
    }
</style>