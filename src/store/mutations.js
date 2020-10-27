import {ADDTOCART, ADDCOUNT} from "./mutation-type";

export default   {
  [ADDCOUNT](state, payload) {
    payload.count ++
  },

  [ADDTOCART](state, payload) {
    state.cartList.push(payload)
  }
}