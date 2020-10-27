<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div  slot="center">购物街</div>
    </nav-bar>

    <tab-control
            :titles="['流行', '新款', '精选']"
            class="tab-control"
            @tabClick="tabClick"
            v-show="isFixed"
            ref="tabcontrol2"></tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @scroll="contentScroll" >
      <home-swiper :banners="banners"
                   @imageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
              :titles="['流行', '新款', '精选']"
              @tabClick="tabClick"
              ref="tabcontrol1"></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childrenComps/HomeSwiper";
  import RecommendView from "./childrenComps/RecommendView";
  import FeatureView from "./childrenComps/FeatureView";

  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import {getHomeMutidata,getHomeGoods} from "network/home";

  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      TabControl,
      GoodsList,

      NavBar,
      Scroll
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoodsList() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    created() {
      //判断图片是否加载完成
      //首页数据的使用
      this.getHomeMutidata()

      //商品数据的请求
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
    },
    methods: {

      contentScroll(position) {
        //判断是否显示返回顶部的按钮
        this.isShowBackTop = (-position.y) > 1000

        //判断tabcontrol是否吸顶
        this.isFixed = (-position.y) > this.tabOffsetTop
      },

      //轮播图的加载
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabcontrol1.$el.offsetTop;
      },

      //新款 精选 流行之间的相互切换
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }

        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;
      },

      //上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      //关于首页相关的请求数据
      getHomeMutidata() {
        getHomeMutidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page
        getHomeGoods(type, page).then(res => {
          const newList = res.data.list
          this.goods[type].list.push(...newList)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>