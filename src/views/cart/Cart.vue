<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./cartComps/CartList";
  import CartBottomBar from "./cartComps/CartBottomBar";

  //vuex的辅助写法
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,

      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        //将一个getters的名字用另一个名字代替
        length: "cartLength"
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
  }
</style>