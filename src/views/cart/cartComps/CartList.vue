<template>
  <scroll class="cart-list">
    <cart-list-item
            :key="index"
            v-for="(item, index) in cartList"
            :list-item="item">
    </cart-list-item>
  </scroll>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CartListItem from "./CartListItem";

  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "CartList",
    computed: {
      ...mapGetters(["cartList"])
    },
    components: {
      CartListItem,
      Scroll
    }
  }
</script>

<style scoped>
  .cart-list {
    position: absolute;

    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
</style>