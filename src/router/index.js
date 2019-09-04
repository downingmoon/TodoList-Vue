import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/listComponent'
import home from '@/components/homeComponent'
import login from '@/components/login'
import axios from 'axios'
import store from '../store'
import Const from '../constant'

Vue.use(Router)

function isValidToken(token) {
    let res = axios.get('http://localhost:4000/restricted', { headers: { "Authorization": `Bearer ${token}` } })
    .then((res) => {
        return true
    })
    .catch((err) => {
        return false
    })
    return res
}

const loginCheck = (referer) => async (to, from, next) => {
    let token = localStorage.getItem('token')
    // token이 없으면 바로 login 페이지로 보냄.
    if (token == null) {
        store.state.isLoggedIn = false
        store.state.userIdx = 0
        if(referer == 'login') next()
        else {
            alert('로그인이 필요한 페이지 입니다.')
            next('/login')
        }
    } 
    // token이 있으면 token 유효성 체크
    else {
        let res = await isValidToken(token)
        store.state.isLoggedIn = res
        store.state.userIdx = localStorage.getItem('userIdx')
        console.log(res)
        if(referer == 'login' && res) {
            alert('이미 로그인된 사용자 입니다.')
            next('/')
        } else if (res) {
            next()
        } else if(!res) {
            alert('로그인이 필요한 페이지 입니다.')
            next('/login')
        }
    }
}

export default new Router({
    mode: "history",
    routes: [
        {path: '/', name: 'home', component: home, beforeEnter: loginCheck(), },
        {path: '/list', name: 'list', component: list, beforeEnter: loginCheck()},
        {path: '/login', name: 'login', component: login, beforeEnter: loginCheck('login')}
    ]
})
