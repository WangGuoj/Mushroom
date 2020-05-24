<template>
<div id="home" >
 <nav-bar class="home-nav">
   <div slot="nav-bar-left"></div>
   <div slot="nav-bar-center">蘑菇街</div>
   <div slot="nav-bar-right"></div>
 </nav-bar>
  <tab-control 
       :titles = "['流行','新款','精选' ]" 
        :class="{tabcontrol:isTopFixed}" 
        @tabClick="tabClick" ref="tabcontrol1" v-show="isTopFixed"> 
  </tab-control>
<scroll class="content" 
        ref="scroll" 
        :pull-up-load="true" :probe-type="3" 
        @backhide="backhide" @pullingUp="loadMove" >
  <home-swiper :banners="banners" @swiperLoad="swiperLoad" />   
  <recommend-view :recommend="recommends" />
  <feature-view />
  <tab-control 
       :titles = "['流行','新款','精选' ]" 
        @tabClick="tabClick" ref="tabcontrol2" > 
  </tab-control>
  <goods-list :goods="goods[currentType].list"/>
</scroll>

<back-top @click.native="backClick" v-show="backtophide"/>

 </div>
</template>

<script>

import NavBar from 'components/commons/navbar/NavBar'
import Scroll from 'components/commons/scroll/Scroll'

import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { gethomemultidata, getHomeGoods } from 'network/home'
import {debounce} from 'common/util'

export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: [] },
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      backtophide:false,
      tabOffsetTop:0,
      isTopFixed:false,
      saveY:Number,
      itemListener:null
    }
  },
  methods: {
// 监听事件相关方法
    // 点击更改属性显示不同goods页面
     tabClick(index) {
      switch(index){
        case 0:
         this.currentType = 'pop' ;
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
         this.$refs.tabcontrol1.currentIndex =index
         this.$refs.tabcontrol2.currentIndex =index

    },
    // 点击返回顶部
    backClick() {
      //不封装
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      //封装，封装的函数在Scroll.vue
      this.$refs.scroll.scrollTo(0,0)
    },
      // 按钮的隐藏
    backhide(position){
        this.backtophide = (-position.y) > 1000 ? true : false;
        this.isTopFixed = this.tabOffsetTop+44 < (-position.y)
        // this.isTopFixed  = this.tabOffsetTop < (-position.y) ? false : true
     },
       //下拉更多
      loadMove(c){
          this.getHomeGoods(this.currentType)
      } ,
      //获取tab-control到顶部的距离 //因为图片大小对距离有影响，对tab-control上部图片进行监听
       swiperLoad(){
         //$el 获取组件中的元素,每个组件都有一个 this.$rers.xxx.$el
          this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop      
       },
//  -------------------------------------------------------------------
    // 请求banner、nav数据
    gethomemultidata() {
      gethomemultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 2、请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      })
    }
  },
  created () {
    // 请求多个数据
    this.gethomemultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
    mounted(){
               // 图片加载完成监听事件 ，刷新可滚动距离 
        const refresh = debounce(this.$refs.scroll.refresh,50)
          this.itemListener = () =>{
             refresh()
            //图片监听完成后才能获取到正确的位置
           }
        //$bus 事件总线和vuex类似 可以跨多级
        this.$bus.$on('imgLoad',this.itemListener)       
    },
  // 回来页面并且回到离开前的位置 // 必须在keep-aline
  activated(){
        // this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,this.saveY,20); 
        this.$refs.scroll.refresh()
  },//离开页面，并且把离开页面的位置保存在saveY中
  deactivated(){
     this.saveY = this.$refs.scroll.getscrollY()
    //离开页面关闭$bus时间总线 防止别的页面触发刷新
     this.$bus.$off('imgLoad',this.itemListener)
  }
}
</script>
<style  scoped>
#home{
  position: relative;
  height: 100vh;
}
.home-nav{
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  position: absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tabcontrol{
  position: relative;
  margin-top:-1px;
  z-index: 9;
}
</style>
