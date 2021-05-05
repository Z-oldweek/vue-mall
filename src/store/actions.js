import { ADD_COUNT, ADD_TO_CART } from './mutations-type'


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // state.cartList.push(payload)
      //判断是否有旧的商品
      let oldProduct = null
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }

      //有，数量加一
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('添加到购物车成功')
      } else {
        //没有，将新的添加到购物车
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加到购物车成功')
      }
    })
  }
}