<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button
              :is-checked="listItem.checked"
              @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="listItem.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{ listItem.title }}</div>
      <div class="item-desc">{{ listItem.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ listItem.price }}</div>
        <div class="item-count right">x{{ listItem.count }} </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    props: {
      listItem:{
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        this.listItem.checked = !this.listItem.checked
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    display: flex;

    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    background-color: #ffffff;

    font-size: 0;
  }

  .item-selector {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20px;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    display: block;

    width: 80px;
    height: 100px;

    border-radius: 5px;
  }

  .item-info {
    position: relative;
    overflow: hidden;

    padding: 5px 10px;

    font-size: 17px;
    color: #333;
  }

  .item-info .item-desc {
    margin-top: 15px;

    font-size: 14px;
    color: #666;
  }

  .info-bottom {
    position: absolute;

    margin-top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>