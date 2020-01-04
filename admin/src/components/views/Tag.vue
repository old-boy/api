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
                <el-button type="primary">Search</el-button>
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
                        <el-button @click="handleDeleteClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                        <el-button @click="handleEditClick(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
        </el-table>
        
        <el-dialog
            title="新增数据"
            :visible.sync="dialogVisible"
            width="30%"
            >
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
            productTags:{},
            tags:[],
            delarr:[],
            multipleSelection:[],
            dialogVisible: false
        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(() => {
                done();
            })
            .catch(() => {});
        },
        saveTag(){
            this.$http.post(api.baseURL + "/product/tag",this.productTags);
            this.$message({
                type:"success",
                message:"保存成功"
            })
        },
        getTags(){
            this.$http.get(api.baseURL + "/product/tag").then((res) =>{
                this.tags = res.data;
            }).catch(err => alert(err))
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    created() {
        this.getTags()
    },
}
</script>
<style lang="scss">
    
</style>