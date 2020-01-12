<template>
    <div class="code">
        <codemirror
            :value="code"
            :options="editorOption"
            ref="myEditor"
            @change="yourCodeChangeMethod">
        </codemirror>
    </div>
</template>
<script>
import Vue from 'vue'
import { codemirror } from 'vue-codemirror-lite'

Vue.use(codemirror)

export default {
    name:'CodeEdit',
    components: {
        codemirror
    }
}
</script>