<!--
 * @Author: Quinn
 * @Date: 2021-03-30 13:45:12
 * @LastEditTime: 2021-03-30 20:35:29
 * @LastEditors: quinn
 * @Description:  
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    components: {
      HelloWorld
    }
  }
</script>