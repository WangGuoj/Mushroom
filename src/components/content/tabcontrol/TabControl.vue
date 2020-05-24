<template>
<div id="tab-control">
    <div class="tab-control-item" :key="index" v-for="(item,index) in titles"
    :class = "{active: index == currentIndex}" @click="currentIndexs(index)">
        <span>{{item}}</span>
    </div>
</div>
</template>
<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    currentIndexs (index) {
      this.currentIndex = index
      this.$emit("tabClick",index)
    }
  }
}
</script>
<style  scoped>
#tab-control {
    display: flex;
    height: 40px;
    line-height:40px;
    text-align: center;
    background-color:white ;
}
.tab-control-item{
    flex:1;
}
.active {
    color: var(--color-high-text);
    border-bottom: 3px solid pink
}
</style>
