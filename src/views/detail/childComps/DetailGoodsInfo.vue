<template>
  <div class="goods-info" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ goodsInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ goodsInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img :src="item" alt=""
           v-for="(item, index) in goodsInfo.detailImage[0].list"
           @load="detailImageLoaded"
           :key="index">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      goodsInfo: {
        type:　Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imageLength: 0
      }
    },
    methods: {
      detailImageLoaded() {
        this.$emit('detailImageLoaded')
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;

    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start,
  .info-desc .end {
    position: relative;

    width: 90px;
    height: 1px;

    background-color: #a3a3a5;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before,
  .info-desc .end::after {
    content: '';
    position: absolute;

    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0
  }

  .info-desc .end::after {
    content: '';
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;

    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>