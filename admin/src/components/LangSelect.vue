<template>
    <div class="lang">
        <el-select v-model="value" placeholder="English" >
            <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<style lang="scss">
    .lang{
        .el-select{
            width: 100%;
            input.el-input__inner{
                border-radius: 0;
                background: #315f79;
                border: 0;
            }
        }
    }
</style>
<script>
export default {
    name:"LangSelect",
    data(){
        return {
            options: [{
                value: 'chinese',
                label: 'Chinese'
                }, {
                value: 'english',
                label: 'English'
                }
            ]
        }
    }
}
</script>