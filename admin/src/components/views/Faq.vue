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
                <el-button type="primary" @click="searchFaq">Search</el-button>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="dialogVisible=true">Add</el-button>
            </el-form-item>
        </el-form>

        <el-table 
            :data="faqs" 
            class="table"
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
                    label="faq Title">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="link(scope.row)">{{scope.row.faqTitle}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template>
                        <el-button type="text" size="small">删除</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
        </el-table>
        
        
        <el-dialog
            title="新增Faq"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <el-form @submit.native.prevent="saveFaq">
                <el-form-item label="">
                    <el-input v-model="productFaq.faqTitle"></el-input>
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
            faq:{},
            faqs:'',
            productFaq:{},
            multipleSelection:[],
            dialogVisible:false
        }
    },
    methods: {
        searchFaq(){

        },
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
        saveFaq(){
            this.$http.post(api.baseURL + '/faq/add', this.productFaq).then((faq) => {
                if(faq.faqTitle || faq.status == 400){
                    this.$message({
                        type:"warning",
                        message:"数据巳存在"
                    })
                    return false;
                }else{
                    this.$message({
                        type:"success",
                        message:"新增成功"
                    })
                }
            })
        },
        getFaq(){
            this.$http.get(api.baseURL + "/faq/all").then((res) => {
                this.faqs = res.data;
            }).catch(err => alert(err))
        }
    },
    created() {
        this.getFaq()
    },
}
</script>
<style lang="scss">
    
</style>