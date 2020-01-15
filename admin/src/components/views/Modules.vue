<template>
    <div class="modules details">
        <el-form 
            :inline="true" 
            label-position="left" 
            class="form-inline search-right">
            <el-form-item label="">
                <el-button type="primary" @click="dialogVisible=true">Add</el-button>
            </el-form-item>
        </el-form>

        <el-table 
                :data="modelsArr"
                border 
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="_id"
                    label="id"
                    width="300">
                    <template slot-scope="scope" current-row-key="_id">{{ scope.row._id }}</template>
                </el-table-column>
                <el-table-column
                    prop="moduleName"
                    label="Module Name">
                </el-table-column>
                <el-table-column
                    prop="moduleClassName"
                    label="Module ClassName">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="del(scope.row._id)" type="text" size="small">删除</el-button>
                        <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
        </el-table>
        
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            >
            <h3 class="title">{{id ? '编辑':'新增'}}数据</h3>
            <el-form @submit.native.prevent="save">
                <el-form-item 
                    :model="editModel" 
                    label="Model Name">
                    <el-input v-model="editModel.moduleName"></el-input>
                </el-form-item>
                <el-form-item 
                    :model="editModel" 
                    label="Model Name">
                    <el-input v-model="editModel.moduleClassName"></el-input>
                </el-form-item>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" native-type="submit" @click="dialogVisible = false">确 定</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import api from '../../api/http.js';
export default {
    name:"Modules",
    data(){
        return {
            id:'',
            modelsArr:[],
            editModel:{},
            dialogVisible:false,
            multipleSelection:[]
        }
    },
    created() {
        this.getModules();
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        save(){
            if(this.id){
                this.$http.post(api.baseURL + `/product/modules/${this.id}`,this.editModel).then((res) => {
                    this.setArr(res);
                    this.$message({
                        type:"success",
                        message:"更新成功"
                    });
                    this.getModules();
                })
            }else{
                this.$http.post(api.baseURL + `/product/modules`,this.editModel).then((res) => {
                    this.setArr(res);
                    this.$message({
                        type:"success",
                        message:"新增成功"
                    });
                    this.getModules();
                });
            }
        },
        edit(row){
            this.id = row;
            this.dialogVisible = true;
            this.getOneModules(row);
        },
        getModules(){
            this.$http.get(api.baseURL + `/product/modules`).then((res) => {
                this.modelsArr = res.data;
            }).catch(err => alert(err))
        },
        setArr(option){
            const arr = [];
            arr.push(option.data);
            this.modelsArr = arr;
        },
        getOneModules(row){
            this.$http.get(api.baseURL + `/product/modules/${row}`).then((res) => {
                this.editModel = res.data;
            })
        },
        del(row){
            this.$http.delete(api.baseURL + `/product/modules/${row}`).then(() => {
                this.$message({
                    type:"success",
                    message:"删除成功"
                });
                this.getModules();
            })
        },
        search(){

        }
    },
}
</script>
<style lang="scss">
    
</style>

