<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles" :key="item" class="titles-item"
        :class="{active:index === currentIndex}" @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "detailNavBar",
  components: {
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      //发送点击事件
      this.$emit('itemClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.titles{
  display: flex;
  font-size: 14px;
}
.titles-item{
  flex:1
}
.active{
  color: #ff6700;
}
.back{
  text-align: center;
  margin-top: 11px;
}
.back img{
  display: block;
  margin: 0 auto;
  /* margin-top: 10px; */
  /* margin-bottom: 10px; */
}
</style>