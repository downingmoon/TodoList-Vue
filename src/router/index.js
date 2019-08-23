import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/listComponent'
import home from '@/components/homeComponent'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {path: '/', name: 'home', component: home},
        {path: '/list', name: 'list', component: list}
    ]
})
