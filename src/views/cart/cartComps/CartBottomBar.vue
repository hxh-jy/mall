<template>
  <div class="bottom-menu">
    <check-button
            :is-checked="isSelectAll"
            @checkBtnClick="checkBtnClick"
            class="select-all"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartLength}})</span>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(["cartList","cartLength"]),
      totalPrice() {
        const cartList = this.cartList
        return cartList.filter(item => {
          return item.checked
        }).reduce((prevalue, item) => {
          return prevalue + item.count * item.price
        }, 0).toFixed(2)
      },

      isSelectAll() {
        return !(this.cartList.find(item => item.checked ===  false))
      }
    },
    methods: {
      checkBtnClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }  else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    position: fixed;

    width: 100%;
    height: 44px;
    left: 0;
    bottom: 49px;
    padding-left: 35px;

    font-size: 14px;
    color: #888;
    line-height: 44px;

    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;

    left: 12px;
    top: 13px;

    line-height: 0;
  }


  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }

  .bottom-menu .total-price {

  }
</style>