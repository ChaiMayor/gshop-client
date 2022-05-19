<template>
  <div>
    <section class="order">
      <HeaderTop title="订单列表" />
      <section class="order_no_login" v-if="!userInfo.name">
        <img src="./images/person.png" />
        <h3>登录后查看外卖订单</h3>
        <button @click="skipToLogin">立即登陆</button>
      </section>
      <div id="container-goods" class="container-goods" v-else>
        <h2 class="hintElem" v-if="cartFoods.length === 0">请先去点餐~</h2>
        <ul id="goods-list" v-else>
          <li
            class="food-item bottom-border-1px"
            v-for="(food, index) in cartFoods"
            :key="index"
          >
            <div class="icon">
              <img width="57" height="57" v-lazy="food.icon" />
            </div>
            <div class="content">
              <h2 class="name">{{ food.name }}</h2>
              <p class="desc">{{ food.description }}</p>
              <div class="extra">
                <span class="count">月售{{ food.sellCount }}份</span>
                <span>好评率{{ food.rating }}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{ food.price }}</span>
                <span class="old" v-if="food.oldPrice"
                  >￥{{ food.oldPrice }}</span
                >
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food" />
              </div>
            </div>
          </li>
        </ul>
        <div id="shop-cart" v-if="cartFoods.length">
          <OrderCount />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import CartControl from "../../components/CartControl/CartControl.vue";
import OrderCount from "../../components/OrderCount/OrderCount.vue";
import { mapState } from "vuex";

export default {
  name: "MyOrder",
  components: {
    HeaderTop,
    CartControl,
    OrderCount,
  },
  computed: {
    ...mapState(["userInfo", "cartFoods"]),
  },
  methods: {
    skipToLogin() {
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.hintElem {
  margin-top: 65px;
  padding-left: 20px;
}

#shop-cart {
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
}

#goods-list {
  margin-top: 45px;
  padding: 2px 0;
}

.food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  bottom-border-1px(rgba(7, 17, 27, 0.1));

  &:last-child {
    border-none();
    margin-bottom: 0;
  }

  .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .content {
    flex: 1;

    .name {
      margin: 2px 0 8px 0;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .desc, .extra {
      line-height: 10px;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }

    .desc {
      line-height: 12px;
      margin-bottom: 8px;
    }

    .extra {
      .count {
        margin-right: 12px;
      }
    }

    .price {
      font-weight: 700;
      line-height: 24px;

      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }

      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 0;
      bottom: 12px;
    }
  }
}

.order { // 订单
  width: 100%;
  position: relative;

  .header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;

      .icon-sousuo {
        font-size: 25px;
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 20px;
        color: #fff;
        display: block;
      }
    }

    .header_login {
      font-size: 14px;
      color: #fff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      .header_login_text {
        color: #fff;
      }
    }
  }

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      margin-top: 6px;
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>