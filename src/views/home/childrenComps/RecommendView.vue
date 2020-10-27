<template>
  <div class="recommend">
    <div class="recommend-item"
         v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span> {{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;

    width: 100%;
    margin-top: 10px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eeeeee;

    font-size: 12px;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>