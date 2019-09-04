<template>
    <div>
        <ipt></ipt>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in list" :key="item.idx" :class="isDone(index, 'class')">
                {{item.todo}}
                <button class="btnDelete" @click="del(item.idx)"><span class="fa fa-trash"></span></button>
                <button class="btnComplete" @click="complete(item.idx)" v-if="!isDone(index, 'if')"><span class="fa fa-check"></span></button>
            </li>
            <li class="list-group-item text-center" v-if="isEmpty">할 일 목록이 없습니다.</li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    import ipt from './inputComponent'
    import bus from './bus'

    export default {
        name: 'list',
        data() {
            return {
                list: []
            }
        },
        components: {ipt},
        created() {
            // console.log("created")
            bus.$on("addEvent", this.add)
            this.getList(localStorage.getItem('userIdx'))
        },
        methods: {
            getList: function(idx) {
                console.log(idx)
                axios.get('http://localhost:4000/todos/' + idx, {idx: Number(idx)})
                .then((res) => {
                    this.list = res.data.todo
                })
                .catch((ex) => {
                    alert(ex)
                })
            },
            complete: function(idx) {
                axios.put('http://localhost:4000/todos/' + idx, {idx: idx})
                .then((res) => {
                    this.getList()
                })
                .catch((ex) => {
                    alert(ex)
                })
            },
            isDone: function(idx, flag) {
                // console.log(`idx : ${idx}, isdone: ${this.list[idx].ISDONE}`)
                if(this.list[idx].isDone == 0) {
                    if(flag === 'class') return {done : false}
                    if(flag === 'if') return false
                }
                if(this.list[idx].isDone == 1) {
                    if(flag === 'class') return {done : true}
                    if(flag === 'if') return true
                }
            },
            del: function(idx) {
                let conf = confirm("정말 삭제하시겠습니까?")
                if(conf) {
                    axios.delete('http://localhost:4000/todos/' + idx, {idx: idx})
                    .then((res) => {
                        console.log(res)
                        this.getList()
                    })
                    .catch((ex) => {
                        alert(ex)
                    })
                }
            },
            add: function(todo, idx) {
                if(todo != '') {
                    axios.post('http://localhost:4000/todos', {todo: todo, userIdx: Number(idx)})
                    .then((res) => {
                        console.log(res)
                        this.getList(idx)
                    })
                    .catch((ex) => {
                        alert(ex)
                    })
                }
            }
        },
        computed: {
            isEmpty: function() {
                if(this.list == null || this.list.length == 0) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>

<style>
    .btnComplete {
        border: none;
        background-color: #bcf3ca;
        border-radius: 3px;
        width: 40px;
        color: #000;
        float: right;
    }

    .btnDelete {
        border: none;
        background-color: #ffa3a3;
        border-radius: 3px;
        width: 40px;
        color: #000;
        float: right;
    }
    .btnUpdate {
        border: none;
        background-color: #007bff;
        border-radius: 3px;
        width: 40px;
        color: #fff;
        float: right;
    }

    .done {
        background-color: #bcf3ca;
        text-decoration: line-through;
    }
</style>
