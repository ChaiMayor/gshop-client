<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";

export default {
  name: "App",
  components: { FooterGuide },
  mounted() {
    this.receive_categorys();
    this.receive_address();
    this.receive_shops();
  },
  methods: {
    // 提取出来变成函数
    ...mapActions(["receive_address", "receive_shops", "receive_categorys"]),
  },
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
#app {
  width 100% {
    height: 100%;
    background: #f5f5f5;
    position: relative;
  }

  a {
    text-decoration: none;
  }
}
</style>
