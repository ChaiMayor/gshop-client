<template>
  <footer class="footer_guide border-1px">
    <span
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/msite' === $route.path }"
      @click="goToPath('/msite')"
    >
      <span class="item_icon">
        <i class="iconfont icon-icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <span
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/search' === $route.path }"
      @click="goToPath('/search')"
    >
      <span class="item_icon">
        <i class="iconfont icon-iconsearch"></i>
      </span>
      <span>搜索</span>
    </span>
    <span
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/order' === $route.path }"
      @click="goToPath('/order')"
    >
      <span class="item_icon">
        <i class="iconfont icon-icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/profile' === $route.path }"
      @click="goToPath('/profile')"
    >
      <span class="item_icon">
        <i class="iconfont icon-icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>

<script>
export default {
  methods: {
    goToPath(path) {
      if (this.$route.path === path) return;
      this.$router.replace(path);
    },
  },
};
</script>

<style  lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.footer_guide { // footer
  top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;

    &.on {
      color: #02a774;
    }

    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>