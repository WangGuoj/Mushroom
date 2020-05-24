<template>
    <tab-bar>
      <tab-bar-item path='/home'>  // 这种用了别名
      <img slot="item-icon" src="~assets/img/tabbar/shouye1.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/shouye2.svg">
       <span slot="item-text">首页</span>
      </tab-bar-item>
      <tab-bar-item path='/category'>  // 这种没有用别名
      <img slot="item-icon" src="../../../assets/img/tabbar/gengduo1.svg">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/gengduo2.svg">
      <span slot="item-text">分类</span>
      </tab-bar-item>
      <tab-bar-item path='/shopcart'>
      <img slot="item-icon" src="../../../assets/img/tabbar/gouwu1.svg">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/gouwu2.svg">
       <span slot="item-text">购物车</span>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
      <img slot="item-icon" src="../../../assets/img/tabbar/geren1.svg">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/geren2.svg">
       <span slot="item-text">个人</span>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
import TabBar from 'components/commons/tabbar/TabBar'
import TabBarItem from 'components/commons/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
