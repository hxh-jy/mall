<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item, index) in categories"
           :class="{active : index === currentIndex}"
           @click="itemClick(index)"
           :key="index">
        {{ item.title }}
      </div>
    </div>
</scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      categories: Array
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu {
    width: 100px;
    height: 100%;

    background-color: #f6f6f6;

    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;

    text-align: center;
    font-size: 12px;
  }

  .active {
    border-left: 3px solid var(--color-high-text);

    font-weight: 700;
    color: var(--color-tint);
    background-color: #fff;
  }
</style>