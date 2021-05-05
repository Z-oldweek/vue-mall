<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabControlFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper
        :banner="banner"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- native修饰符:组件需要监听原生事件时需要使用native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

//子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

//方法
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    //公共组件
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    //子组件
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      //商品数据结构
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      isTabControlFixed: false,
      saveY: 0,
      homeImageListener: null,
    };
  },
  //生命周期函数，首页创建完就发送网络请求
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    // console.log('1');
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    // console.log('1');
    this.$bus.$on("itemImgLoad", this.homeImageListener);

    
  },
  deactivated() {
    // console.log('2');
    //保存y值
    this.saveY = this.$refs.scroll.bs.y;
    //取消监听事件
    this.$bus.$off('itemImgLoad', this.homeImageListener)
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = this.debounce(this.$refs.scroll.refresh);
    //监听goodsitem图片加载完成并通过refs获取scroll组件中的refresh方法
    this.homeImageListener = () => {
      // console.log('111');
      this.$refs.scroll && refresh();
    };

    this.$bus.$on("itemImgLoad", this.homeImageListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //防抖函数
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    //监听点击事件方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //解决tabbar不一致问题
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //返回顶部点击事件
    backClick() {
      //通过refs获取scroll组件，并可以直接获取组件内的data，通过scrollTo方法回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    scroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2. 决定tabControl是否吸顶
      this.isTabControlFixed = -position.y > this.tabControlOffsetTop;
    },
    //上拉加载
    pullingUp() {
      // console.log('2222');
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.finishPullUp()
    },
    //2.获取tabControl的offsetTop
    //所有组件中都有一个属性$el：用于获取组件中的元素
    swiperImgLoad() {
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabControlOffsetTop);
    },

    //网络请求相关方法

    //获取多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        //存储数据
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    //获取商品数据
    getHomeGoods(type) {
      //动态获取page,根据type获取页码
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        //...：相当于一种解构，把res.data.list中的元素一个个push进数组中
        this.goods[type].list.push(...res.data.list);
        //页码加一
        this.goods[type].page += 1;
        // this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* padding-bottom: 49px; */
  height: 100vh;
  /* position: relative; */
}
.home-nav {
  background-color: #f2f2f2;
  color: #747474;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  /* top: 44px; */
  z-index: 9;
}
.content {
  /* height: 500px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>