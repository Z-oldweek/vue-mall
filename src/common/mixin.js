
import {POP, NEW, SELL} from "./const";
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    //监听详情页图片加载完成
    // const refresh = this.debounce(this.$refs.scroll.refresh);
    //保存监听函数
    this.itemImgListener = () => {
      this.$refs.scroll.refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    // console.log('hu');
    
  }
}

export const backTopMixin = {
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
