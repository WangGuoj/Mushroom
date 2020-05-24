<template>
<div id="scroll" ref="wrapper">
   <div class="content"><slot></slot></div> 
</div>
    
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false,
        }
    },
    data() {
       return {
           scroll: null 
       } 
    },
    mounted() {
       //获取插件监听的组件的元素，并且监听的元素只能用一个子元素，孙级以下不限
       this.scroll =new BScroll(this.$refs.wrapper,{
            click: true, //允许在scroll内监听点击事件
            //  probetype: 控制监听滚动 0 1不监听 2监听但不包括惯性  3都包括
            probeType:this.probeType,
            //下滑加载更多配置  ture只能加载一次 false不开启下滑加载
            pullUpLoad:this.pullUpLoad,
        })
      //  监听滚动位置
    if(this.probeType ===2 || this.probeType ===3){
            this.scroll.on('scroll',position =>{
            this.$emit('backhide',position)
        })
    }
      //下滑加载更多
       if(this.pullUpLoad){
          this.scroll.on('pullingUp',() =>{
          this.$emit('pullingUp')
      })
       }
    },
   methods: {
 //--------------------------------------------------------------      
    //封装scroll方法 
        //封装scrollTo方法  跳转到指定位置
       scrollTo(x,y,time=300){
          this.scroll && this.scroll.scrollTo(x,y,time)
       },
       //封装finishPullUp方法 //当请求下滑加载更多完成后允许下次再次请求   
        finishPullUp(){
           this.scroll && this.scroll.finishPullUp()
        },
      //refresh() refresh重新计算wrapper可滚动区域
    refresh(){
        this.scroll && this.scroll.refresh()
    },
    //封装scrollY方法，获取滚动y轴的值
    getscrollY(){
        return this.scroll ? this.scroll.y : 0
    }
}
}
</script>

<style  scoped>

</style>
