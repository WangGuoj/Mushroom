<template>
<div class="goods-list-item" @click="itemClick">
  <img :src="imageDecide" alt="" @load="imgLoad">
 <div class="goods-list-item-content">
   <p>{{goodsItem.title}}</p>
   <span class="price">{{goodsItem.price}}</span>
   <span class="collect">{{goodsItem.cfav}}</span>
 </div>
</div>
</template>

<script>
export default {
  name: 'GoodsListItem',
 props: {
  goodsItem: {
    type: Object,
    default() {
      return {}
    }
  }
 },
 methods: {
   imgLoad(){        
     this.$bus.$emit('imgLoad')
   },
   itemClick(){
     this.$router.push('/detail/'+this.goodsItem.iid)
   }
 },
 computed:{
   imageDecide(){
     return this.goodsItem.image ||this.goodsItem.show.img
   }
 }
}

</script>

<style  scoped>
.goods-list-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-list-item img {
  width:100%;
  border-radius: 5px;
}

.goods-list-item-content {
  font-size:12px;
  position: absolute;
  bottom: 5px;
  left:0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-list-item-content p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  margin-bottom: 3px;
}

.goods-list-item-content .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-list-item-content .collect {
  position: relative;
}
.goods-list-item-content .collect::before {
  content:'';
  position: absolute;
  left: -15px;
  top:-1px;
  width: 14px;
  height: 14px;
  background-image: url("~assets/img/commonimg/star.svg");
  background-size:12px 12px ;
}
</style>
