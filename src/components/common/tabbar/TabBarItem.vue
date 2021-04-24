<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 图片插槽 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 文字插槽 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#ff6700'
    }
    
  },
  data(){
    return{
    }
  },
  computed:{
    isActive(){
      //动态判断哪个item处于活跃状态
      //$route是当前活跃的路由，取出当前活跃路由的path与item的path判断，indexOf找到不等于-1，没找到等于-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    //动态绑定颜色
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      //路由跳转，路径不固定
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /* line-height: 49px; */
}
.tab-bar-item img{
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>