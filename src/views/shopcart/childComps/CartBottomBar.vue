<template>
    <div id="bottom-bar">
        <div class="check-content" >
            <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
            <span >全选</span>
        </div>
        <div class="price">合计:{{totalPrice}}</div>
        <div class="calculate">结算({{checkLength}})</div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import{ mapGetters } from "vuex"

export default {
    name:"CartBottomBar",
    props:{
        
    },
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return '￥'+ this.cartList.filter(item =>{
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0)
        },
        checkLength(){
            return this.cartList.filter(item => item.checked).length
        },
       isSelectAll(){
           if(this.cartList.length === 0) return false
        return  !this.cartList.find(item => !item.checked)
         //方法1也要if判断 
    //    return  !(this.cartList.filter(item =>!item.checked).length)
       } 
    },
    methods:{
        checkClick(){
            this.cartList.forEach(item => {
               if(item.checked) {
                   item.checked = false
               }else{
                   item.checked = true
               }
            });
        }
    }
}
</script>

<style scoped>
#bottom-bar {
    display: flex;
    height:40px ;
    background-color: white ; 
    line-height: 40px;
}

.check-content{ 
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 5px ;
} 
.check-button{
    width: 20px;
    height: 20px;
    margin-right: 5px;
    line-height: 20px;
}
.price{
    flex: 3;
}
.calculate{
    flex: 1;
   background-color: red;
   text-align: center;
}
</style> 