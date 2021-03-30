<!--
 * @Author: Quinn
 * @Date: 2020-12-21 14:19:15
 * @LastEditTime: 2021-03-30 11:50:03
 * @LastEditors: quinn
 * @Description:  
-->
<template>
    <div class="contain">
        <div>{{DESC}}</div>
        <div>{{NODE_ENV}}</div>
        <div>{{ENV_CONFIG}}</div>
        <div>{{BASE_API}}</div>
    </div>
</template>

<script>
    export default {
        computed: {
            DESC() {
                return process.env.DESC
            },
            NODE_ENV() {
                return process.env.NODE_ENV
            },
            ENV_CONFIG() {
                return process.env.ENV_CONFIG
            },
            BASE_API() {
                return process.env.BASE_API
            }
        },
    }
</script>
<style lang="scss" scoped>
    .contain {
        background: lightblue;
        padding: 50px 20px;
    }
</style>