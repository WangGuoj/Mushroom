<template>
<div id="goods-list">
  <goods-list-item :key="index" v-for="(item,index) in goods" :goods-item = "item" />
</div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>
<style  scoped>
#goods-list {
  margin-top: 10px;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-around ; 
}
</style>
