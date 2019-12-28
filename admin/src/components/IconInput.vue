<template>
    <div class="icon-input">
        <i class="icon pos-l" :class="iconClassName"></i>
        <div class="el-input anviz-input">
            <input :type="inputType" :class="inputClass" :placeholder="placeholder" :value="curValue" @input="inputEvent">
        </div>
    </div>
</template>
<style lang="scss">
    .icon-input{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        .icon{
            color: #889aa4;
            font-size: 24px;
            width: 40px;
            height: 40px;
            border-right: 1px solid hsla(0,0%,100%,.1);
            position: absolute;
            top: 0;
            z-index: 2;
            &::before{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            &.pos-l{
                left: 0;
            }
            &.pos-r{
                right: 0;
            }
        }
        .anviz-input{
            z-index: 1;
            input{
                &[placeholder]{
                    padding-left: 50px;
                }
            }
        }
    }
</style>
<script>
export default {
    name:"Input",
    data(){
        return {
            curValue: this.value
        }
    },
    props:["inputType","inputClass","placeholder","iconClassName"],
    watch: {
        vaue(val){
            this.setCurValue(val);
        }
    },
    methods: {
        setCurValue(val){
            if(val === this.curValue) return;
            this.curValue = val;
        },
        inputEvent(event){
            let val = event.target.value; 
            this.$emit('input', val)
        }
    },
}
</script>