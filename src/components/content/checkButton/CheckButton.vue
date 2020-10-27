<template>
  <div class="icon-selector"
       @click="itemClick"
       :class="{'active':  isChecked}">
    <img src="~/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>

  export default {
    name: "CheckButton",
    data() {
      return {}
    },
    props: {
      isChecked: {
        type: Boolean
      }
    },
    methods: {
      itemClick() {
        this.$emit('checkBtnClick')
      }
    }
  }
</script>

<style scoped>
  .icon-selector {
    position: relative;

    width: 18px;
    height: 18px;
    margin: 0;
    border: 2px solid #ccc;

    border-radius: 50%;
    cursor: pointer;
  }

  .active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>