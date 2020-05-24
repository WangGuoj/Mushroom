<template>
    <div id="cart-list">
    <scroll class="content">
        <li :key="index" 
            v-for="(item,index) in cartList">
           <cart-list-item :product="item"></cart-list-item>
        </li>
    </scroll>
    </div>

</template>
<script>
import Scroll from "components/commons/scroll/Scroll"
import CartListItem from "./CartListItem"

import { mapGetters } from 'vuex'

    export default {
        name:"CartList",
        components:{
            Scroll,
            CartListItem
        },
        computed:{
            ...mapGetters(["cartList"])
        }
    }
</script>
<style scoped>
 #cart-list {
    position: relative;
  }

  .content {
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
  .content li{
      list-style: none;
  }
</style>