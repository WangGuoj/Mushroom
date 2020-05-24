<template>
   <div class="nav-bar">
       <div class="nav-bar-left"><slot name="nav-bar-left"></slot></div>
       <div class="nav-bar-center"><slot name="nav-bar-center"></slot></div>
       <div class="nav-bar-right"><slot name="nav-bar-right"></slot></div>
   </div>
</template>
<script>

export default {
  name: 'NavBar',
  components: {

  }
}
</script>

<style scoped>
.nav-bar{
    display: flex;
    height: 44px;
    line-height:44px;
    text-align: center;
    box-shadow:0 1px 1px rgba(197, 197, 197, 0.8)
}
 .nav-bar-center{
    flex: 4;
    /* background-color: pink; */
    color: white;
}
 .nav-bar-left{
    flex: 1;
    /* width: 40px;
    background-color:red;
    color: white; */
} .nav-bar-right{
    flex: 1;
    /* width: 40px;
    background-color: red;
    color: white; */
}
</style>
