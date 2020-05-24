<template>
    <div id="detail-nav-bar">
          <nav-bar > 
            <div class="nav-back" slot="nav-bar-left" @click="jumphome"><img src="~assets/img/commonimg/back.svg"></div>
            <div class="detail-nav-content" slot="nav-bar-center">
                <div :key="index" v-for="(item,index) in Detailheader" @click="changClick(index)"
                   class="detail-nav-item" :class="{isdetail:index == detailchang}">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/commons/navbar/NavBar'
export default {
    name:"DetailNavBar",
    data(){
        return {
            Detailheader:['商品','参数','评价','推荐'],
            detailchang:0
        }
    },
    components:{
        NavBar
    },
    methods:{
        changClick(index){          
       this.detailchang = index
       this.$emit('navScroll',index)
        },
        jumphome(){
            this.$router.push("/home")
        }
    }
}
</script>
<style scoped>
  .detail-nav-content{
      display: flex;
  }
  .nav-back img{
      margin-top: 10px;   
  }
  .detail-nav-item{
        flex: 1;
        color: #000;
        font-size: 12px;
        background-color: rgb(252, 246, 246);
  }
  .isdetail{
      color:rgb(240, 55, 41);
  }
</style>