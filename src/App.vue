<template>
    <div id="app">
        <div class="container">
            <div class="card">
                <div class="card-header bg-white">
                    <h3 class="text-center">Todo List</h3>
                    <ul>
                        <li>
                            <router-link to="/">홈</router-link>
                        </li>
                        <li>
                            <router-link to="/list">목록</router-link>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    .card {margin-top: 20px;}
</style>
