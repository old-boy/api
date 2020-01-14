<template>
    <div class="details">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/product/staticPage">StaticPage</a></el-breadcrumb-item>
            <el-breadcrumb-item>{{curTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">
            <el-link icon="el-icon-view" @click="preview()" :underline="false" type="primary">预览</el-link>
            <el-link v-if="editBtn" icon="el-icon-edit" @click="edit()" :underline="false" type="primary">编辑</el-link>
            <el-button v-if="editTrue" type="primary" class="save-btn" @click="saveCode">保存</el-button>
        </div>
        
        <div class="border-block">
            <el-row v-if="editTrue">
                <el-input type="textarea" v-model="curCode"></el-input>
            </el-row>
            <el-row v-else>
                <pre>{{curCode}}</pre>
            </el-row>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="80%"
            >
            
            <div class="dialog-content" v-html="curCode"></div>
        </el-dialog>
    </div>
</template>
<script>
import api from '../../api/http.js';

export default {
    data(){
        return {
            id:'',
            curTitle:'',
            curCode:'',
            dialogVisible:false,
            formCode:'',
            editTrue:false,
            editBtn:true
        }
    },
    methods: {
        async getUrlOption(){
            this.id = this.$route.query.staticId;
            const res = await this.$http.get(api.baseURL + `/product/staticpage/${this.id}`);
            this.curTitle = res.data.title;
            this.curCode = res.data.code;
        },
        preview(){
            this.dialogVisible = true;
        },
        edit(){
            this.editTrue = true;
        },
        saveCode(){
            this.$http.post(api.baseURL + `/product/staticpage/${this.id}`, this.curCode);
            this.editTrue = false;
            this.$message({
                type:"success",
                message:"更新成功"
            });

            this.getUrlOption()
        },
        setArr(option){
            const arr = [];
            arr.push(option.data);
            this.tags = arr;
        },
    },
    created() {
        this.getUrlOption()
    },
}
</script>
<style lang="scss">
    .title{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 40px;
        width: 100%;
        margin-top: 1em;
        position: relative;
        .el-link{
            height: auto;
            padding-left: 1em;
        }
        h3{
            margin: 0;
        }
        .save-btn{
            position: absolute;
            right: 1em;
            bottom: 10px;
        }
    }
</style>