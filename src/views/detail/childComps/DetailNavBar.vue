<template>
  <nav-bar>
    <img slot="left"
         class="back"
         src="~assets/img/common/back.svg"
         @click="backClick"
         alt="">
    <div class="title"  slot="center">
      <div class="title-item"
           v-for="(item, index) in titles"
           @click="detailClick(index)"
           :class="{activeClass: currentIndex === index}"
           :key="index">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    props: {
      titles: {
        type: Array,
        default() {}
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
      }
    },
    methods: {
      detailClick(index) {
        this.$emit('detailClick',index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back {
    margin-top: 10px;
  }

  .title {
    display: flex;
    padding: 0 20px;
  }

  .title-item {
    flex: 25%;
    font-size: 14px;
  }

  .activeClass {
    color: var(--color-high-text);
  }
</style>