<template>
  <swiper>
    <swiper-item v-for="item in banner" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    //获取数据
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style>
</style>