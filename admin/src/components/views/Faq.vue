<template>
    <div class="faq">
        <h3 class="text-left">Faq</h3>
        <el-form 
            :inline="true" 
            :model="faq" 
            label-position="left" 
            class="form-inline search-right">
            <el-form-item label="">
                <el-input v-model="faq.title" placeholder="faq title"></el-input>
            </el-form-item>
           <el-form-item>
                <el-button type="primary">Search</el-button>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="dialogVisible=true">Add</el-button>
            </el-form-item>
        </el-form>

        <el-table 
            :data="faqs" 
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
                <template slot-scope="scope">{{ scope.row._id }}</template>
            </el-table-column>
            <el-table-column
                label="faq Title">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="link(scope.row)">{{scope.row.faqTitle}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delFaq(scope.row._id)">删除</el-button>
                    <el-button type="text" size="small" @click="editFaq(scope.row._id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            >
           <h3 class="title">{{id ? '编辑':'新增'}}数据</h3>
            <el-form @submit.native.prevent="saveFaq">
                
                <el-form-item label="Selete Tag">
                    <el-select v-model="value" placeholder="Selete Tag">
                        <el-option v-for="item in tags"
                            :key="item._id"
                            :label="item.tagName"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="FAQ Title">
                    <el-input v-model="productFaq.faqTitle"></el-input>
                </el-form-item>
                <el-form-item label="FAQ Details">
                    <el-input type="textarea" v-model="productFaq.faqInformation"></el-input>
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
    name:"Faq",
    data(){
        return {
            id:'',
            faq:{},
            tags:'',
            value:'',
            faqs:[],
            productFaq:{},
            multipleSelection:[],
            dialogVisible:false
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        link(item){
            this.$router.push({
                path:"/dashboard",
                query:{
                    faqId:item._id
                }
            })
        },
        editFaq(row){
            this.id = row;
            this.dialogVisible = true;
        },
        saveFaq(){
            if(this.id){
                this.$http.post(api.baseURL + `/faq/${this.id}`, this.productFaq).then((res) => {
                    this.setArr(res);
                    this.$message({
                        type:"success",
                        message:"更新成功"
                    })
                    this.getFaq();
                    this.id = '';
                });
            }else{
                this.$http.post(api.baseURL + `/faq/add`, this.productFaq).then((res) => {
                    this.setArr(res);
                    this.$message({
                        type:"success",
                        message:"新增成功"
                    });
                    this.getFaq();
                });
            }
        },
        async getFaq(){
            this.$http.get(api.baseURL + "/faq/all").then((res) => {
                this.setArr(res);
            }).catch(err => alert(err))
        },
        async getTags(){
            const res = await this.$http.get(api.baseURL + "/product/tag");
            this.tags = res.data;
            // alert(JSON.stringify(this.tags))
        },
        setArr(option){
            const arr = [];
            arr.push(option.data);
            this.tags = arr;
        },
        delFaq(row){
            this.$http.delete(api.baseURL + `/faq/${row}`).then(() => {
                this.$message({
                    type:"success",
                    message:"删除成功"
                });
                this.getFaq();
            });
        },
        
    },
    created() {
        this.getFaq();
        this.getTags();
    },
}
</script>
<style lang="scss">
    
</style>