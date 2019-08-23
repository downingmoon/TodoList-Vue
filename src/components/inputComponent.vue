<template>
    <div class="input-group mb-4">
        <input type="text" class="form-control" @keyup.enter="addBtn()" v-model="todo">
        <div class="input-group-append">
            <button class="btn btn-outline-success" type="button" @click.stop="addBtn()">추가</button>
        </div>
    </div>
</template>

<script>
import bus from './bus'

export default {
    name: 'ipt',
    data() {
        return {
            todo: ''
        }
    },
    methods: {
        addBtn: function() {
            if(this.todo != '') {
                bus.$emit("addEvent", this.todo)
            } else {
                alert('공백은 추가할수 없습니다.')
            }
            this.todo = ''
        }
    }
}
</script>

<style scoped>

</style>
