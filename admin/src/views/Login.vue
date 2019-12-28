<template name="login">
    <div class="login-container">
        <el-form :model="form" class="login-form">
            <h3 class="title">用户登录</h3>
            <el-form-item class="mb-10">
                <IconInput v-model="form.email" inputType="text" inputClass="el-input__inner border bg" placeholder="email" iconClassName="el-icon-user"></IconInput>
            </el-form-item>
            <el-form-item class="mb-10">
                <IconInput v-model="form.password" inputType="password" inputClass="el-input__inner border bg" placeholder="password" iconClassName="el-icon-view"></IconInput>
            </el-form-item>
            <el-form-item label="" class="login-checkbox">
                <el-checkbox label="记住密码" name="type"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="login">登录</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>
<script>
import IconInput from '../components/IconInput.vue'
export default {
    data(){
        return {
            form:{},
            userName:''
        }
    },
    components:{
        IconInput
    }
}
</script>
<style lang="scss">
    .login-container{
        min-height: 100%;
        width: 100%;
        height: 100vh;
        background-color: #2d3a4b;
        overflow: hidden;
        .mb-10{
            margin-bottom: 10px
        }
        .login-checkbox{
            display: flex;
            justify-content: flex-end;
        }
        .login-form{
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
            .border{
                border: 1px solid hsla(0,0%,100%,.1);
                border-radius: 5px;
            }
            .bg{
                color: #fff;
                background: rgba(0,0,0,.1);
            }
            .title{
                text-align: center;
                color: #889aa4;
            }
        }
    }
</style>