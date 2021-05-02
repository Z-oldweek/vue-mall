<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info = 'detailInfo' @imageLoad= 'imageLoad'></detail-goods-info>
      <detail-param-info :paramInfo = 'paramsInfo'></detail-param-info>
    </scroll>
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

// 方法
import { getDetail, Goods, Shop, GoodsParam} from "network/detail";
//公共组件
import Scroll from "components/common/scroll/Scroll";

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
    //公共组件
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramsInfo:{}
    };
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  },
  //路由传参通过route.params
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求数据
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
      this.detailInfo = res.result.detailInfo
      //5.获取参数信息
      this.paramsInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #f2f2f2;
}
</style>