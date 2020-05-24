<template>
<div id="tab-bar">
  <slot></slot>
</div>
</template>
<script>
export default {
  name: 'TabBar'
}
</script>
<style  scoped>
 #tab-bar{
   display: flex;
   background-color: #f6f6f6;
      position:fixed;
      bottom: 0;
      right:0;
      left: 0;
      height: 49px;
      box-shadow:0 -1 2 rgba(100,100,100,0.5);
      font-size: 12px;
 }
</style>
