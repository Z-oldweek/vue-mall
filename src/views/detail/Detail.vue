<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type= 3 @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramsInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart = 'addToCart'></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast message = 'hhh'></toast> -->
  </div>
</template>

<script>
// 子组件
import DetailNavBar from "./childComps/detailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

// 方法
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
//公共组件
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";
// import Toast from "components/common/toast/Toast";


//混入
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    //子组件
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    GoodsParam,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    //公共组件
    Scroll,
    GoodsList,
    BackTop,
    
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      topYs: [],
      currentIndex:null,
      isShowBackTop: false,

    };
  },
  mixins: [itemListenerMixin],
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.topYs.push(0);
      this.topYs.push(this.$refs.param.$el.offsetTop);
      this.topYs.push(this.$refs.comment.$el.offsetTop);
      this.topYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.topYs);
    },
    itemClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.topYs[index], 300);
    },
    //监听滚动
    scroll(position){
      //是否显示backTop
      this.isShowBackTop = -position.y > 1000;

      
      let length = this.topYs.length
      const positionY = -position.y
      for(let i = 0;i<length;i++){
        if(this.currentIndex !==i &&((i < length-1 && positionY >= this.topYs[i] && 
        positionY < this.topYs[i+1]) || (i === length-1 && positionY >= this.topYs[i]))){
          this.currentIndex = i
          // console.log(this.currentIndex);
          //通过ref取到navbar中的currentIndex
          this.$refs.navbar.currentIndex = this.currentIndex
          
        }
      }
      
    },
    backClick() {
      //通过refs获取scroll组件，并可以直接获取组件内的data，通过scrollTo方法回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //添加商品到购物车
    addToCart(){
      // console.log('111');
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // product.count = 0
      //2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      //对代码进行重构，用actions
      //dispatch返回一个Promise
      this.$store.dispatch('addCart',product).then((res)=>{
        this.$toast.show(res)
        
      })
      
    }
  },
  //路由传参通过route.params
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      //1.顶部轮播图数据
      this.topImages = res.result.itemInfo.topImages;
      // console.log(this.topImages);

      //2.获取商品信息
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      //3.获取店铺信息
      this.shop = new Shop(res.result.shopInfo);
      //4.商品详情数据
      this.detailInfo = res.result.detailInfo;
      //5.获取参数信息
      this.paramsInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      );
      //6.获取评论信息
      if (res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  mounted() {
    // console.log('111');
  },
  //组件摧毁时取消全局监听
  destroyed() {
    this.$bus.$off("itemImgLoad", this.detailImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  padding-bottom: 49px;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #f2f2f2;
}
</style>