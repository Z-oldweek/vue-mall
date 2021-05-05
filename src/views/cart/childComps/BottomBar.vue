<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="chenck-button"
        :isChecked="isSelectAll"
        @click.native="selectAllClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="pay">支付({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.filter((item) => !item.checked).length;
    },
  },
  methods:{
    selectAllClick(){
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => {
          return item.checked = false
        })
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #f6f6f6;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 49px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  /* border-top: 1px solid #ccc; */
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  width: 60px;
}
.chenck-button {
  height: 20px;
  width: 20px;
  line-height: 20px;
}
.price {
  /* margin-left: 30px; */
  flex: 1;
  text-align: center;
}
.pay {
  width: 90px;
  background-color: rgb(255, 87, 34);
  text-align: center;
  color: #333;
}
</style>