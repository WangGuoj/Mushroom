<template>
    <div id="check-button" :class="{checked:isChecked}">
         <img src="~assets/img/cart/tick.svg" alt=""  >
    </div>
</template>
            
<script>
export default {                    
    name:'CheckButton',
    props:{
        isChecked:{
            type:Boolean,
            default(){
                return false
            }
        }
    }
}
</script>

<style scoped>
  #check-button{
    
      border: 1px solid #aaa;
      border-radius:50%
  }
  .checked{
      background-color:red;
      border-color:red;
  }
</style>