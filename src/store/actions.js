import {ADDTOCART, ADDCOUNT} from "./mutation-type";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADDCOUNT, oldProduct)
        resolve('商品的数量+1')
        reject('请求失败，发生错误')
      } else {
        payload.count = 1
        payload.checked = true
        context.commit(ADDTOCART,payload)
        resolve('成功添加商品到购物车中')
        reject('添加商品失败')
      }
    })
  }
}