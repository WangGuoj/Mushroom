<template>
    <div id="bottom-bar">
         <goods-list-item :key="index" v-for="(item,index) in bottomBar" :goods-item = "item" />
    </div>
</template>
<script>
import GoodsList from 'components/content/goods/GoodsList'
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
    name:"DetailBottomBar",
    props:{
       bottomBar:{
        type:Array,
        default(){
           return []
           }
        }
    },
    components:{
        GoodsListItem
    },
    methods:{
    }
}
</script>
<style scoped>
#bottom-bar {
  margin-top: 10px;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-around ; 
}
</style>