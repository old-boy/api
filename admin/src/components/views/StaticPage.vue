<template>
    <div class="static-page">
        <el-form 
            :inline="true" 
            :model="staticData" 
            label-position="left" 
            class="form-inline search-right">
            <el-form-item label="">
                <el-input v-model="staticData.title" placeholder="static title"></el-input>
            </el-form-item>
           <el-form-item>
                <el-button type="primary">Search</el-button>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="dialogVisible=true">Add</el-button>
            </el-form-item>
        </el-form>

        <el-table 
            :data="staticArr" 
            border 
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="_id"
                label="id"
                width="300">
                <template v-slot="scope">{{ scope.row._id }}</template>
            </el-table-column>
            <el-table-column
                label="Static Title">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="link(scope.row)">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="seoName"
                label="Seo Name">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delStatic(scope.row._id)">删除</el-button>
                    <el-button type="text" size="small" @click="editStatic(scope.row._id)">编辑</el-button>
                </template>
            </el-table-column>
            <span class="no-data text-center" v-if="showData">{{noDataMessage}}</span>
        </el-table>
        
        
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            >
           <h3 class="title">{{id ? '编辑':'新增'}}数据</h3>
            <el-form @submit.native.prevent="saveStatic">
                
                <el-form-item label="Static Title">
                    <el-input v-model="productStatic.title"></el-input>
                </el-form-item>
                <el-form-item label="Static Page">
                    <el-input type="textarea" v-model="productStatic.code"></el-input>
                </el-form-item>
                <el-form-item label="Static Seo">
                    <el-input type="textarea" v-model="productStatic.seoName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogVisible=false">取消</el-button>
                    <el-button type="primary" native-type="submit" @click="dialogVisible=false">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import api from '../../api/http.js';

export default {
    name:"StaticPage",
    data(){
        return {
            id:'',
            showData:false,
            staticData:{
                title:''
            },
            noDataMessage:'',
            productStatic:{},
            dialogVisible: false,
            dialogTitle:'',
            staticArr:[],
            multipleSelection:[]
        }
    },
    
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getStaticPage(){
            this.$http.get(api.baseURL + `/product/staticpage/`).then((res) =>{
                // alert(JSON.stringify(res.data))
                this.showData = true;
                this.noDataMessage = res.data.message;
                this.staticArr = res.data;
            }).catch(err => alert(err))
        },
        saveStatic(){
            if(this.id){
                this.$http.post(api.baseURL + `/product/staticpage/${this.id}`, this.productStatic).then((res) => {
                    this.setArr(res);
                    // this.id = "";
                    this.$message({
                        type:"success",
                        message:"更新成功"
                    });
                    this.getStaticPage();
                });
            }else{
                this.$http.post(api.baseURL + "/product/staticpage/add", this.productStatic).then((res) => {
                    this.setArr(res);
                    this.$message({
                        type:"success",
                        message:"新增成功"
                    });
                    this.getStaticPage();
                });
            }
            
        },
        setArr(option){
            const arr = [];
            arr.push(option.data);
            this.tags = arr;
        },
        link(item){
            this.$router.push({
                path:"/product/staticPage/details",
                query:{
                    staticId:item._id
                }
            })
        },
        editStatic(row){
            this.id = row;
            this.dialogVisible = true;
            this.getOneStatic(row);
        },
        async getOneStatic(row){
            
            const res = await this.$http.get(api.baseURL + `/product/staticpage/${row}`);
            this.productStatic = res.data;
        },
        delStatic(row){
            this.$http.delete(api.baseURL + `/product/staticpage/${row}`).then((res) => {
                if(res.data.message == true){
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    });
                    this.getStaticPage();
                    this.id = "";
                }
            })
        }
        
    },
    created() {
        this.getStaticPage();
    }
}
</script>
<style lang="scss">
    
</style>