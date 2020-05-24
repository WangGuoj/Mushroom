<template>
  <div id="detail-swiper">
        <swiper class="detail-swiper-height">
            <swiper-item :key="index" v-for =" (item,index) in topImages ">
                    <img :src="item" alt="" @load="swiperLoad"/>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import {Swiper,SwiperItem} from 'components/commons/swiper/index'

export default {
    name:'DetailSwiper',
    props:{
        topImages:{
          type:Array,
          default(){
            return []
          }
        }
    },
    data(){
      return {
        Swipers:false
      }
  },
    components:{
        Swiper,
        SwiperItem
    },
    methods:{
        swiperLoad(){
            if(!this.Swipers){
                this.$emit('imgLoad')
                this.Swipers = true;
            }
        }
    }
}
</script>
<style scoped>
.detail-swiper-height{
    height: 300px;
    overflow: hidden;
}
</style>