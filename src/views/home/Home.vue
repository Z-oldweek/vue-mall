<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banner = 'banner'></home-swiper>
    <recommend-view :recommend = 'recommend'></recommend-view>
  </div>
</template>
<script>

import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata} from 'network/home'


export default {
  name:"Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data(){
    return {
      banner:[],
      recommend:[]
    }
  },
  //生命周期函数，首页创建完就发送网络请求
  created(){
    //1.请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res);
      //存储数据
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  .home-nav{
    background-color: #f2f2f2;
    color:#747474
  }
</style>