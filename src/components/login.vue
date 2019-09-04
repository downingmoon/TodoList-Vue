<template>
    <div class="login-wrap" >
        <form name="loginForm">
            <div>
                <input type="text" name="userId" placeholder="ID" class="form-control" v-model="id">
                <input type="password" name="userPassword" placeholder="Password" class="form-control" v-model="pwd" @keypress.enter="submitLogin()">
                <div v-if="isSignup">
                    <input type="password" name="pwdConfirm" placeholder="Password Confirm" class="form-control" v-model="pwdConfirm">
                </div>
                <button type="button" class="btn btn-block btn-outline-success" @click.prevent="login()">Login</button>
                <button type="button" class="btn btn-block btn-outline-primary" @click.prevent="signupToggle()">SignUp</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Const from '../constant'
export default {
    name: 'login',
    data() {
        return {
            isSignup: false,
            id: "",
            pwd: "",
            pwdConfirm: ""
        }
    },
    methods: {
        login: function() {
            if(this.isSignup) {
                this.isSignup = false
                this.id = ''
                this.pwd = ''
                this.pwdConfirm = ''
            } else {
                this.submitLogin()
            }
        },
        signupToggle: function() {
            if(!this.isSignup) {
                this.isSignup = true
                this.id = ''
                this.pwd = ''
                this.pwdConfirm = ''
            } else if(this.id == '' || this.pwd == '' || this.pwdConfirm == '') {
                alert('입력되지 않은 항목이 있습니다.')
                return false
            } else {
                this.submitSignup()
            }
        },
        submitLogin: function() {
            if(this.id == "" || this.pwd == "") {
                alert('입력되지 않은 항목이 있습니다.')
                return false
            }
            this.$store.dispatch(Const.SUBMIT_LOGIN, {userId: this.id, userPassword: this.pwd})
        },
        submitSignup: function() {
            if(this.pwd != this.pwdConfirm) {
                alert('비밀번호가 일치하지 않습니다.')
                return false
            } else {
                axios.post('http://localhost:4000/user', {userId: this.id, userPassword: this.pwd})
                .then((res) => {
                    alert('가입되었습니다.')
                    this.isSignup = false
                    this.id = ''
                    this.pwd = ''
                    this.pwdConfirm = ''
                })
                .catch((ex) => {
                    alert(ex)
                })
            }
        }
    }
}
</script>

<style scoped>
    .login-wrap {margin: 100px 0px;; padding: 0px 280px;}
    form > div {padding: 20px; border: 1px solid #e2e2e2; border-radius: 5px;}
    form input {margin-bottom: 10px;}
</style>