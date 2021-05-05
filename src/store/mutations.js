import {ADD_COUNT,ADD_TO_CART} from './mutations-type'

export default {
  //mutations中的方法尽量单一
  //添加数量
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  //添加到购物车
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}