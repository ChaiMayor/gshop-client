<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <router-link slot="left" to="/search">
          <span class="header_search">
            <i class="iconfont icon-icon-sousuo"></i>
          </span>
        </router-link>
        <router-link slot="right" :to="userInfo._id ? '/userInfo' : '/login'">
          <span class="header_login">
            <span class="header_login_text" v-if="!userInfo._id"
              >登录|注册</span
            >
            <span class="header_login_text" v-else>
              <i class="iconfont icon-icon-geren"></i>
            </span>
          </span>
        </router-link>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="getCategoryArr.length > 0">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(CategoryList, index) in getCategoryArr"
              :key="index"
            >
              <a
                href="javascript:"
                class="link_to_food"
                v-for="(minCategory, index) in CategoryList"
                :key="index"
              >
                <div class="food_container">
                  <!-- 将对象内容遍历进去 -->
                  <img v-lazy="`${baseImgUrl}${minCategory['image_url']}`" />
                </div>
                <!-- 将对象内容遍历进去 -->
                <span>{{ minCategory["title"] }}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <div v-if="getCategoryArr.length === 0">
          <img src="./images/msite_back.svg" alt="" />
        </div>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-icon_zhedie"></i>&nbsp;
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";

export default {
  name: "MyMsite",
  data() {
    return {
      baseImgUrl: "https://fuss10.elemecdn.com",
    };
  },
  components: {
    HeaderTop,
    ShopList,
  },
  computed: {
    // 获取地址对象内容
    ...mapState(["address", "categorys", "userInfo"]),
    // 处理数组内容,返回二维数组方便遍历
    getCategoryArr() {
      // 从自身vc身上拿到数据
      let { categorys } = this;
      let arr = [];
      let begin = 0;
      let end = 8;
      for (let i = 0; i < 99999; i++) {
        // 如果本次截取长度大于数组长度,则说明没有数据了
        if (end > categorys.length) {
          end = categorys.length;
        }
        arr.push(categorys.slice(begin, end));

        // 当截取的长度到达数组长度即为截取完成,结束循环
        if (end === categorys.length) break;

        // 从下一节的第一个开始
        begin = end;
        // 到下一节的最后一个
        end += 8;
      }
      return arr;
    },
  },
  mounted() {
    this._initSwiper();
  },
  watch: {
    categorys() {
      this._initSwiper();
    },
  },
  methods: {
    _initSwiper() {
      this.$nextTick(() => {
        //此条语句要写到数据更新之后,实现轮播效果
        // 创建一个Swiper实例对象, 来实现轮播
        new Swiper(".swiper-container", {
          loop: true, // 可以循环轮播
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });
    },
  },
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 60px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .miste-content-wrapper {
    position: fixed;
    top: 45px;
    bottom: 46px;
    width: 100%;
  }
}

.icon-icon_zhedie {
  font-size: 12px !important;
}

.msite_shop_list {
  top-border-1px(#e4e4e4);
  margin-top: 10px;
  background: #fff;

  .shop_header {
    padding: 10px 10px 0;

    .shop_icon {
      margin-left: 5px;
      color: #999;
    }

    .shop_header_title {
      color: #999;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .shop_container {
    margin-bottom: 50px;
  }
}
</style>