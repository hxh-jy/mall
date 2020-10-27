<template>
  <div id="detail">
    <detail-nav-bar
            @detailClick="detailClick"
            class="detail-nav-bar"
            :current-index="currentIndex"
            :titles="titles"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper  :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
              :goods-info="goodsInfo"
              @detailImageLoaded="detailImageLoaded">
      </detail-goods-info>
      <detail-params-info
              ref="param"
              :params-info="paramsInfo"></detail-params-info>
      <detail-comment-info
              ref="comment"
              :comment-info="commentInfo"></detail-comment-info>
      <goods-list
              ref="recommend"
              :goods="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>

</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import GoodsList from "components/content/goods/GoodsList";


  import Scroll from "components/common/scroll/Scroll";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import {getDetail, Goods, Shop, GoodsParams,
    getRecommend} from "network/detail";

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList,

      Scroll,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        titles: ['商品','参数','评论','推荐'],
        goods: {},
        shopInfo: {},
        goodsInfo: {},
        paramsInfo: {},
        commentInfo: {},

        themeTopYs: [],

        goodsList: [],
        currentIndex: 0,
      }
    },
    created() {
      //1取出iid
      this.iid = this.$route.params.iid

      //2 发送商品请求
      this._getDetail(this.iid)

      //3发送商品的推荐数据
      this._getRecommend()

    },
    methods: {
      ...mapActions(["addCart"]),

      detailImageLoaded() {
        this.$refs.scroll.refresh()
      },

      // 2 监听导航栏  滚动到对应的位置
      detailClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },

      // 3 监听滚动事件  根据滚动事件对应的滚动到相应的导航栏
      contentScroll(position) {
        //决定是否显示返回按钮
        this.isShowBackTop = -position.y > 1000

        //监听滚动到某个主题
        let length = this.themeTopYs.length

        const positionY = -position.y
        for (let i = 0; i < length -1; i ++) {
          if (this.currentIndex !== i &&
              positionY >= this.themeTopYs[i]  &&
              positionY < this.themeTopYs[i + 1]) {
            this.currentIndex = i   //此处相当于用空间换时间
          }
        }
      },

      addToCart() {
        let  product = {}
        product.iid = this.iid
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.image = this.topImages[0]

        this.addCart(product).then( (res) => {
          this.$toast({message: res})
        })
      },

      //与网络请求相关的操作  得到详情页的详细信息

      _getDetail(iid) {
        getDetail(this.iid).then(res => {
          console.log(res)
          // 1获取数据
          const data = res.result

          //2 获取顶部轮播图的数据
          this.topImages = data.itemInfo.topImages

          //3 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //4获取店铺信息
          this.shopInfo = new Shop(data.shopInfo)

          //5 获取商品详情数据
          this.goodsInfo = data.detailInfo

          //6 获取商品的参数详细信息
          this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

          //7 获取商品相关的评论信息
          this.commentInfo = data.rate.list[0]
        })
      },

      //  推荐数据
      _getRecommend() {
        getRecommend().then(res => {
          this.goodsList = res.data.list
        })
      }
    },
    mounted() {
    },
    updated() {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)  //加入一个最大值
    },
    destroyed() {
      this.$bus.$off('itemImagLoad', this.itemImageListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;

    height: 100vh;
    background-color: #ffffff;
    z-index: 9;
  }

  .detail-nav-bar {
    position: relative;

    background-color: #fff;

    z-index: 9;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>