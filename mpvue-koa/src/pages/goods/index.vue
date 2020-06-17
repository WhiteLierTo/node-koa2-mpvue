<template>
  <div class="goods">
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        duration="1000"
      >
        <block>
          <swiper-item class="swiper-item">
            <img src="" alt="" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>
<script>
import { get, post } from "../../utils";
export default {
  data() {
    return {
      gallery: [], //banner
      id: "",
      openId: "",
    };
  },
  mounted() {
    this.openId = wx.getStorageSync("openId") || "";
    this.goodsDetail();
  },
  methods: {
    async goodsDetail() {
      const data = await get("/goods/detailaction", {
        id: 1009024,
        openId: this.openId,
      });
      console.log(data);
    },
  },
};
</script>
