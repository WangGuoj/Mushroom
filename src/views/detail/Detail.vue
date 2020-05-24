<template>
    <div id="Detail">
        <detail-nav-bar class="detail-nav" @navScroll="navScroll" ref="navbar"/>
        <scroll class="detail-content" ref="scroll" :probe-type="3" @backhide="backhide">
        <detail-swiper :top-images="topImages" @imgLoad="swiperLoad"/>
        <detail-base-info :goods="goods" /> 
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" />
        <detail-param-info :param-info="paramInfo" ref="param"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <detail-bottom-bar :bottom-bar="bottomBar" ref="bottom"/>
        </scroll>
        <detail-bottom @openShoppingCart="openShoppingCart"/>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import DetailBottom from './childComps/DetailBottom'

import Scroll from 'components/commons/scroll/Scroll'

import {getDetail,GoodsInfo,Shop,getRecommend} from 'network/detail'
import {debounce} from 'common/util'
import {itemListener} from 'common/mixin'

export default {
    name:'Detail',
    data() {
     return{
         iid: null,
         topImages:[],
         goods:{},
         shop:{},
         detailInfo:{},
         paramInfo:{},
         commentInfo:{},
         bottomBar:[],
         itemListener:null,
         currentClick:[],
         ThemeTo:null,
         ScPosition:null
     }   
    },
    // mixins:[itemListener],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        DetailBottom,
        Scroll
    },
    methods:{  
        swiperLoad(){
            this.$refs.scroll.refresh()  
        },
        navScroll(index){    
            this.$refs.scroll.scrollTo(0,-this.currentClick[index],200)
        },
        backhide(position){
            const length = this.currentClick.length
            for(let i = 0;i< length;i++){
                if(this.ScPosition !== i && (i < length-1 && -position.y >= this.currentClick[i] && -position.y < this.currentClick[i+1]
                ||(i === length-1 && -position.y >= this.currentClick[i]))){
                    this.ScPosition = i
                    this.$refs.navbar.detailchang = this.ScPosition
                }
            }    
        },
        openShoppingCart(){
                //1.获取购物车现需要的数据
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc  = this.goods.desc
                product.price = this.goods.realPrice
                product.iid   = this.iid

                // this.$store.cartList.push(product)
                this.$store.dispatch('addCart',product)
                this.$toast.showToast('添加购物车成功',1500)
        }
    },
    created(){    
        //根据商品的iid，获取商品的详细数据
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(res =>{         
            const data = res.result
          //请求iid的详情顶部轮播图  
            this.topImages = data.itemInfo.topImages; 
          //获取封装在goodsinfo中的杂乱商品信息 //信息理顺    
            // console.log(data.itemInfo);
            this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
          //获取店铺信息
            this.shop = new Shop(data.shopInfo)
          //获取详情页商品详细信息
         this.detailInfo = data.detailInfo       
          // 获取衣服、商品材质参数   
        this.paramInfo=data.itemParams

        //取出评论的信息
        if(data.rate.cRate != 0){
            this.commentInfo = data.rate.list[0]
        }            
      })
      //推荐商品
      getRecommend().then(res =>{    
          this.bottomBar = res.data.list    
      })  

      //获取定位
     this.ThemeTo = debounce(()=>{
            this.currentClick = []
            this.currentClick.push(0)
             this.currentClick.push(this.$refs.param.$el.offsetTop) 
             this.currentClick.push(this.$refs.comment.$el.offsetTop)
             this.currentClick.push(this.$refs.bottom.$el.offsetTop) 

         },100)
          
    },
    mounted(){
               // 图片加载完成监听事件 ，刷新可滚动距离 
        const refresh = debounce(this.$refs.scroll.refresh,50)
          this.itemListener = () =>{
             refresh()
            //图片监听完成后才能获取到正确的位置
            this.ThemeTo()
           }
        //$bus 事件总线和vuex类似 可以跨多级
        this.$bus.$on('imgLoad',this.itemListener)       
    },
    destroyed(){
        this.$bus.$off('imgLoad',this.itemListener)
    }
 }
</script>
<style scoped>
#Detail{
    position: relative;
    z-index: 999;
   height: 100vh;
   background-color: white;
}
.detail-nav{
    background-color: rgb(252, 246, 246);
    position: relative;
    z-index: 999;
}
.detail-content{
    position: relative;
   height: calc(100% - 44px);
}
</style>