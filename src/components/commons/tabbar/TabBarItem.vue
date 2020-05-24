<template>
<div id="tab-bar-item" @click="itemClick" >
  <div v-if="!isactive"><slot name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <div :class="{active:isactive}"><slot name="item-text"></slot></div>
</div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: { path: String },
  data () {
    return {
    }
  },
  computed: {
    isactive () {
      return this.$route.path.indexOf(this.path) !== -1
    }
  },
  methods: {
    itemClick () {
      this.$router.push(this.path).catch(() => {})
    }
  }
}
</script>
<style  scoped>
#tab-bar-item{
  flex:1;
  text-align:center;
  height: 49px;
}
#tab-bar-item .active{
  color: red;
}
#tab-bar-item img{
  vertical-align:bottom;
  padding: 4px;
  width:23px;
  height: 23px;
}

</style>
