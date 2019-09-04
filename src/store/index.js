import Vue from 'vue'
import Vuex from 'vuex'
import Const from '../constant'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        [Const.SUBMIT_LOGIN]: (state, payload) => {
            axios.post('http://localhost:4000/login', {
                userId: payload.userId,
                userPassword: payload.userPassword
            })
            .then((res) => {
                if (res.data.token != undefined) {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem('userId', res.data.userId)
                    state.isLoggedIn = true
                    router.push("/list")
                }
            })
            .catch((error) => {
                console.log(error.response.code)
            })
        },
        [Const.LOGOUT]: (state) => {
            state.isLoggedIn = false
            localStorage.removeItem("token")
            localStorage.removeItem('userId')
            router.push("/login")
        }
    },
    actions: {
        [Const.SUBMIT_LOGIN]: (store, payload) => {
            store.commit(Const.SUBMIT_LOGIN, payload)
        },
        [Const.LOGOUT]: (store) => {
            store.commit(Const.LOGOUT)
        }
    }
})

export default store