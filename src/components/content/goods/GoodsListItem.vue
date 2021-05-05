<template>
  <!-- 监听点击 -->
  <div class="goods-item" @click="itemClick">
    <!-- @load监听图片加载完成 -->
    <img :src="showImages" alt="" @load= "imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      // console.log('111');
      //事件总线
      //非父子组件的通信，bus->总线
      this.$bus.$emit('itemImgLoad')
    },
    itemClick(){
      // console.log('1111');
      //跳转详情页,动态路由
      this.$router.push('/detail/' + this.goodsItem.iid)
      
    }
  },
  computed:{
    showImages(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
    .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
    color: #333;
  }

  .goods-info .price {
    color:#ff6700;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>