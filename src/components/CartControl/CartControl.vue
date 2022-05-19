<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="iconfont icon-remove"
        v-if="food.count"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <div class="iconfont icon-jia" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
import {
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
} from "../../store/mutations-types.js";

export default {
  props: {
    food: Object,
  },

  methods: {
    updateFoodCount(isAdd) {
      let tarMutation = null;
      if (isAdd) {
        tarMutation = INCREMENT_FOOD_COUNT;
      } else {
        tarMutation = DECREMENT_FOOD_COUNT;
      }
      this.$store.commit(tarMutation, { food: this.food });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

@keyframes moveAnimation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: translateX(15px) rotate(180deg);
  }
}

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 20px;
    color: #3dba7b;

    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s;
    }

    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-jia {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 20px;
    color: #3dba7b;
  }
}
</style>
