<template>
  <div class="index">
    <!-- 头部的搜索 -->
    <div class="search">
      <div @click="toMappage">{{ cityName }}</div>
      <div>
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url" />
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { mapState, mapMutations } from "vuex";
import { get } from "../../utils/index";
export default {
  data() {
    return {
      banner: []
    };
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
    this.getCityName();
  },
  methods: {
    ...mapMutations(["update"]),
    toMappage() {
      //通过wx.getSetting 先查询一下用户是否授权 “scoped.record”
      let _this = this;
      wx.getSetting({
        success: res => {
          //如果没有同意授权，打开设置
          console.log(res);
          if (!res.authSetting["scope.userInfo"]) {
            wx.wx.openSetting({
              success: res => {
                // 获取授权位置信息
                _this.getCityName();
              },
              fail: err => {
                console.log(err);
              },
              complete: () => {}
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
            // _this.getCityName();
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    getCityName() {
      let _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "f1f7413cf9cabc7b69527fa9cfa23fbe"
      });
      myAmapFun.getRegeo({
        success: function(res) {
          //成功回调
          console.log(res);
        },
        fail: function(err) {
          //失败回调
          console.log(err);
          _this.update({ cityName: "北京" });
        }
      });
    },
    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
