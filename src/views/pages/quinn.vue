<!--
 * @Author: Quinn
 * @Date: 2020-12-21 14:19:15
 * @LastEditTime: 2021-03-30 20:57:53
 * @LastEditors: quinn
 * @Description:  
-->
<template>
    <div class="contain">
        <div style="padding: 20px 0; font-weight: bold;border:1px solid #666;margin: 30px 0 ;">
            <div>{{DESC}}：</div>
            <div>{{NODE_ENV}}</div>
            <div>{{ENV_CONFIG}}</div>
            <div>{{BASE_API}}</div>
        </div>
        <el-progress :percentage="50"></el-progress>
        <div id="css">css is greens</div>
        <div id="scss">scss is blue</div>
        <div id="sass">sass is red</div>
        <div id="less">less is orange</div>
        <div id="stylus">stylus is black</div>
        <img src="../../assets/img/icon.jpg" @click="playVideo" alt="">
        <video src='../../assets/media/test.mp4' id="videoPlay" class="video">您的浏览器不支持 video 视屏播放。</video>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            playVideo() {
                console.log('aaaa');
                // var vdo = document.getElementById("videoPlay");
                // console.log(vdo);
                // vdo.play();
                let a = document.getElementById("css")
                setTimeout(() => {
                    a.style.color = 'yellow'
                }, 1000);
            }
        },
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
<style>
    #css {
        font-weight: bolder;
        font-size: 16px;
        color: green;
    }
</style>
<style lang="scss" scoped>
    #scss {
        font-size: 25px;
        color: blue;
    }


    .el-progress {

        // 深度选择器 修改element组件样式
        ::v-deep .el-progress__text {
            font-size: 26px !important;
            color: red;
            font-weight: bolder;
        }
    }
</style>
<style lang="sass">
    #sass {
        font-size: 35px;
        color: red;
    }
</style>
<style lang="less">
    #less {
        font-size: 45px;
        color: orange;
    }
</style>
<style lang="stylus">
    #stylus {
        font-size: 55px;
        color: black;
    }
</style>

<style lang="scss" scoped>
    .contain {
        background: lightblue;
        padding: 50px 20px;
    }
</style>