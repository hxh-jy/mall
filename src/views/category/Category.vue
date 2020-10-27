<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu
              @selectItem="selectItem"
              :categories="categories"></tab-menu>
      <tab-content-category :subcategories="showSubcategory"></tab-content-category>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";

  import {getCategory, getSubCategory} from "network/category";

  export default {
    name: "Category",
    components: {
      NavBar,

      TabMenu,
      TabContentCategory
    },
    data() {
      return {
        categories: [],
        categorydata: {},
        currentIndex: -1
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categorydata[this.currentIndex].subcategories
      }
    },
    created(){
      this._getCategory()
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          //1 获取分类数据
          this.categories = res.data.category.list

          //2 初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i ++) {
            this.categorydata[i] = {
              subcategories: {}
            }
          }

          // 3请求第一个分类的数据
          this._getSubCategory(0)
        })
      },
      _getSubCategory(index) {
        this.currentIndex = index
        const mailKey = this.categories[index].maitKey
        getSubCategory(mailKey).then(res => {
          console.log(res)
          this.categorydata[index].subcategories = res.data
          this.categorydata = {...this.categorydata}
        })
      },
      selectItem(index) {
        console.log(index)
        this._getSubCategory(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }
</style>