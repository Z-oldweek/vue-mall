<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key=item class="tab-control-item" 
    :class="{active: index === currentIndex}" 
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      //记录下标
      currentIndex : 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(100, 100, 100, .1);
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active{
    color:#ff6700;
    transition: .2s;
  }
  .active span{
    padding: 5px;
    border-bottom: 2px solid #ff6700;
    transition: .2s;
  }
</style>