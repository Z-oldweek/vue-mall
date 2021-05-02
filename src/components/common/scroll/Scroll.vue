<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      bs:null
    }
  },
  mounted(){
    //创建BScroll对象
    this.bs = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    //监听事实滚动
    this.bs.on('scroll',(position) =>{
      //发射监听事件，把位置发送
      this.$emit('scroll',position)
    })
    //上拉加载
    this.bs.on('pullingUp',() =>{
      //发送事件
      this.$emit('pullingUp')
      this.bs.finishPullUp()
      
    })
    // console.log(this.bs);
    

  },
  methods:{
    scrollTo(x,y,time=300){
      this.bs.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.bs.finishPullUp()
    },
    refresh(){
      // console.log('111');
      
      this.bs&&this.bs.refresh()
    }
  }
}
</script>

<style scoped>

</style>>
