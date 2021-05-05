<template>
  <div class="cart">
    <nav-bar class="cart-navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll";


//子组件
import CartList from "./childComps/CartList"
import BottomBar from "./childComps/BottomBar"

export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    Scroll,
    BottomBar
  },
  computed:{
    //两种语法
    ...mapGetters(['cartLength'])
  },
  activated(){
    //刷新
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-navbar{
  background-color: #f2f2f2;
  color: #666;
}
.cart{
  height: 100vh;
  padding-bottom: 49px;

}
.content{
  height: calc(100% - 44px - 40px);
  overflow: hidden;
}
</style>