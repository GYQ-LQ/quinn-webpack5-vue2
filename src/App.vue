<!--
 * @Author: Quinn
 * @Date: 2021-03-26 14:41:20
 * @LastEditTime: 2021-03-30 11:51:06
 * @LastEditors: quinn
 * @Description:  
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/quinn">Quinn</router-link>|
      <router-link to="/errortimeline">ErrorTimeLine</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    background: #f5f5f5;
  }

  #app {
    height: 100%;
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .clearfix:after {
    /*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    *zoom: 1;
    /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
  }
</style>