<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },

    props: {
      probeType: {
        Type: Number,
        dafault: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time = 500)
      },

      //刷新页面
      refresh() {
        this.scroll && this.scroll.refresh()
      },

      //刷新加载更多次
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      getScrollY() {
        this.scroll ? this.scroll.y : 0
      }
    },

    mounted() {
      //1 创建 BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2 监听滚动事件
     if (this.probeType == 3 || this.probeType == 2) {
       this.scroll.on('scroll', position => {
         this.$emit('scroll',position)
       })
     }

      //3 监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  }
</script>

<style scoped>

</style>