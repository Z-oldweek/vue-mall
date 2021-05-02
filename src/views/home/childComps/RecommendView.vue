<template>
  <div class="recommend">
    <div v-for="item in recommend" :key=item.link class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #f5f5f5;
  }
  .recommend-item{
    flex:1
  }
  .recommend-item a{
    display: block;
  }
  .recommend-item img{
    width: 70px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>