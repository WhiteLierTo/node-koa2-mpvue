<template>
  <div class="mappage">
    <div class="section">
      <input type="text" placeholder="搜索" focus="true" v-model="keywords" @input="bindInput" />
    </div>
    <scroll-view :scroll-y="true" class="addcont" style="height:500rpx">
      <div
        class="result"
        v-for="(item,index) in tips"
        :key="index"
        @touchstart="bindSearch(item.name)"
      >{{item.name}}</div>
    </scroll-view>
    <div class="map_container">
      <div class="title">显示当前位置：</div>
      <map
        class="map"
        id="map"
        scale="16"
        :longitude="longitude"
        :latItude="latItude"
        :markers="markers"
      ></map>
    </div>
  </div>
</template>
<script>
import amapFile from "../../utils/amap-wx";
import { mapMutations } from "vuex";
export default {
  name: "mappage",
  data() {
    return {
      tips: [],
      longitude: 0,
      latItude: 0,
      markers: [],
      keywords: ""
    };
  },
  mounted() {
    this.getMapaddress();
  },
  methods: {
    ...mapMutations(["update"]),
    getMapaddress() {
      let _this = this;
      var myAampFun = new amapFile.AMapWX({
        key: "f1f7413cf9cabc7b69527fa9cfa23fbe"
      });
      myAampFun.getRegeo({
        iconPath: "/static/images/marker.png",
        iconWidth: 22,
        iconHeight: 32,
        success: function(res) {
          console.log(res);
          let marker = [
            {
              id: res[0].id,
              latitude: res[0].latitude,
              longitude: res[0].longitude,
              width: res[0].width,
              height: res[0].height
            }
          ];
          _this.markers = marker;
          _this.latitude = res[0].latitude;
          _this.longitude = res[0].longitude;
        }
      });
    },
    bindInput(e) {
      console.log(e);
      let _this = this;
      let keywords = this.keywords;
      var myAampFun = new amapFile.AMapWX({
        key: "f1f7413cf9cabc7b69527fa9cfa23fbe"
      });
      myAampFun.getInputtips({
        keywords: keywords,
        location: "",
        success: function(data) {
          console.log(data);
          if (data && data.tips) {
            _this.tips = data.tips;
          }
        }
      });
    },
    bindSearch(cityName) {
      this.update({ cityName: cityName });
      wx.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>