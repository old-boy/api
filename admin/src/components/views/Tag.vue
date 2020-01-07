<template>
    <div class="tag">
        <h3 class="text-left">Tag</h3>
        <el-form 
            :inline="true" 
            :model="tag"
            label-position="left" 
            class="form-inline search-right">
            <el-form-item label="">
                <el-input v-model="tag.name" placeholder="Tag Name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">Search</el-button>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="dialogVisible=true">Add</el-button>
            </el-form-item>
        </el-form>

        <el-table 
                :data="tags"
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
                    label="id">
                    <template slot-scope="scope">{{ scope.row._id }}</template>
                </el-table-column>
                <el-table-column
                    prop="tagName"
                    label="tagName">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleDeleteClick(scope.$index, scope.row._id)" type="text" size="small">删除</el-button>
                        <el-button @click="handleEditClick(scope.row._id)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
        </el-table>
        
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            >
            <h3 class="title">{{id ? '编辑':'新增'}}数据</h3>
            <el-form @submit.native.prevent="saveTag">
                <el-form-item 
                    :model="productTags" 
                    label="Tag Name">
                    <el-input v-model="productTags.tagName"></el-input>
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
    name:"Tag",
    data(){
        return {
            tag: {
                name: '',
                region: ''
            },
            id:'',
            productTags:{},
            tags:[],
            delarr:[],
            multipleSelection:[],
            dialogVisible: false
        }
    },
    created() {
        this.getTags()
    },
    // activated() {
    //     this.getTags()
    // },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(() => {
                done();
            })
            .catch(() => {});
        },
        saveTag(){
            if(this.id){
                this.$http.post(api.baseURL + `/product/tag/${this.id}`,this.productTags).then((res) => {
                    this.tags = res.data;
                    this.$message({
                        type:"success",
                        message:"更新成功"
                    });
                    this.getTags();
                });
                
            }else{
                this.$http.post(api.baseURL + `/product/tag`,this.productTags).then((res) => {
                    this.tags = res.data;
                    this.$message({
                        type:"success",
                        message:"新增成功"
                    });
                    this.getTags();
                });
            }
        },
        getTags(){
            this.$http.get(api.baseURL + "/product/tag").then((res) =>{
                this.tags = res.data;
            }).catch(err => alert(err))
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleDeleteClick(index,row){
            this.$http.delete(api.baseURL + `/product/tag/${row}`).then(() => {
                this.$message({
                    type:"success",
                    message:"删除成功"
                });
                this.getTags();
            });
            
        },
        handleEditClick(row){
            this.id = row;
            this.dialogVisible = true;
        },
        search(){
            alert(this.tag.name)
            this.$http.get(api.baseURL + `/product/tag/${this.tag.name}`);
            this.getTags();
        }
    }
}
</script>
<style lang="scss">
    
</style>