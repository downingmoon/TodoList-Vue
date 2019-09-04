<template>
    <div id="app" class="container">
        <div class="card">
            <div class="card-header bg-white">
                <h3 class="text-center">Todo List</h3>
            </div>
            <div class="card-body">
                <ul class="menu">
                    <li>
                        <router-link to="/">홈</router-link>
                    </li>
                    <li>
                        <router-link to="/list">목록</router-link>
                    </li>
                    <li>
                        <router-link to="/login" v-if="!isLoggedIn">로그인</router-link>
                        <a href="#" v-if="isLoggedIn" @click.prevent="logout()">로그아웃</a>
                    </li>
                </ul>
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Const from './constant'
export default {
    name: 'App',
    computed: {
        isLoggedIn: function() {
            return this.$store.state.isLoggedIn
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch(Const.LOGOUT)
        }
    }
}
</script>

<style>
    .container, .card-body {position: relative;}
    .card {margin-top: 20px;}
    .menu {display: block; padding: 0px; margin: 10px;}
    .menu > li {display: inline-block; padding: 0px 10px;}
</style>
