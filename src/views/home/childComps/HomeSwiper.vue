<template>
  <swiper class="home-swiper">
    <swiper-item v-for="item in banner" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImgLoad" />
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
  },
  methods:{
    swiperImgLoad(){
      this.$emit('swiperImgLoad')
    }
  }
};
</script>

<style scoped>
  .home-swiper a,.home-swiper img{
    display: block;
  }
</style>