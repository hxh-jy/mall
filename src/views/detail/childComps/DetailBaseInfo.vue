<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount"> {{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span> {{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length -1].name }}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item"
            v-for="index in goods.services.length-1 "
            :key="index">
        <img :src="goods.services[index -1].icon" alt="">
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object
      }
    }
  }
</script>

<style scoped>
  .base-info {
    /*布局相关的定位*/

    /*自身属性*/
    margin-top: 10px;
    padding: 0 8px;
    border-bottom: 5px solid #f2f5f8;

    /*文本属性*/
    color: #999;
  }

  .info-title {
    color: #222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    margin-left: 5px;

    font-size: 13px;
    text-decoration: line-through;
  }

  .info-price .discount {
    /*布局定位的相关属性*/
    position: relative;

    /*自身的相关属性*/
    top: -8px;
    padding: 2px 5px;
    margin-left: 5px;
    background-color: var(--color-high-text);

    /*文本属性*/
    font-size: 12px;
    color: #ffffff;

    /*其他属性*/
    border-radius: 8px;
  }

  .info-other {
    display: flex;

    margin-top: 20px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;

    line-height: 30px;
  }

  .info-other span {
    flex: 1;

    font-size: 14px;
  }

  .info-service {
    display: flex;

    justify-content: space-between;
    line-height: 60px;
  }

  .info-service img {
    position: relative;

    top: 2px;
    width: 14px;
    height: 14px;
  }

  .info-service-item  span {
    font-size: 13px;
    color: #333;
  }
</style>