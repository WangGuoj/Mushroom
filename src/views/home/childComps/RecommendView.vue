<template>
     <div id="recommend-view">
        <div class= "recommend-view-item" :key="item.acm" v-for = "item in recommend">
           <a class="recommend-item-link" :href="item.link">
              <img class="recommend-item-image" :src="item.image" alt="" >
              <span class="recommend-item-text">{{item.title}}</span>
           </a>
        </div>
     </div>
</template>
<script>
export default {
  name: 'RecommendView',
  props: {
    recommend: Array,
    default () {
      return []
    }
  },
  methods:{

  }
}
</script>
<style scoped>
#recommend-view {
  display: flex;
  width: 100%;
  padding: 5px 0 10px 0;
  border-bottom:5px solid rgb(221, 220, 220);
  text-align:center
}
.recommend-view-item{
     flex:1;
}
.recommend-item-image{
     width: 100%;
}
</style>
