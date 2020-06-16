<template>
  <div class="search">
    <div class="head">
      <div>
        <img
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"
          alt=""
        />
        <input
          type="text"
          confirm-type="search"
          focus="true"
          @focus="inputFocus"
          @input="tipsearch"
          @confirm="searchWords"
          placeholder="商品搜索"
          v-model="words"
        />
        <img
          @click="clearInput"
          class="del"
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
          alt=""
        />
      </div>
      <div @click="cancel">
        取消
      </div>
    </div>
    <div class="searchtips" v-if="words">
      <div v-if="tipData.length !== 0">
        <div v-for="(item, index) in tipData" :key="index">
          {{ item.name }}
        </div>
      </div>

      <div class="nogoods" v-else>数据库暂时没有此类商品</div>
    </div>
    <div class="history" v-if="historyData.length !== 0">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <div
          v-for="(item, index) in historyData"
          :key="index"
          @click="searchWords"
          :data-value="item.keyword"
        >
          {{ item.keyword }}
        </div>
      </div>
    </div>

    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div
          v-for="(item, index) in hotData"
          :key="index"
          :class="{ active: item.is_hot === 1 }"
          @click="searchWords"
          :data-value="item.keyword"
        >
          {{ item.keyword }}
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goodsList" v-if="listData.length !== 0">
      <div class="sortnav">
        <div>综合</div>
        <div class="price">价格</div>
        <div>分类</div>
      </div>
      <div class="sortlist">
        <div class="item" v-for="(item, index) in listData" :key="index">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{item.name}}</p>
          <p class="price">￥{{item.retail_price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get, post } from "../../utils";
export default {
  data() {
    return {
      words: "",
      openid: "",
      hotData: [],
      historyData: [],
      tipData: [],
      order: "",
      listData: [],
    };
  },
  mounted() {
    this.openid = wx.getStorageSync("openId") || "";
    this.getHotData();
  },
  methods: {
    clearInput() {
      this.words = "";
    },
    inputFocus() {},
    async tipsearch() {
      const data = await get("search/helperaction", {
        keyword: this.words,
      });
      this.tipData = data.keywords;
    },
    async searchWords(e) {
      let value = e.currentTarget.dataset.value;
      this.words = value || this.words;
      const data = await post("/search/addhistoryaction", {
        openId: this.openid,
        keyword: value || this.words,
      });
      //获取历史数据
      this.getHotData();
      this.getlistData();
    },
    async getHotData(first) {
      const data = await get("/search/indexaction?openId=" + this.openid);
      this.historyData = data.historyData;
      this.hotData = data.hotKeywordList;
    },
    cancel() {},
    async clearHistory() {
      const data = await post("/search/clearhistoryAction", {
        openId: this.openid,
      });
      if (data) {
        this.historyData = [];
      }
    },
    //获取商品列表
    async getlistData() {
      const data = await get("search/helperaction", {
        keyword: this.words,
        order: this.order,
      });
      this.listData = data.keywords;
      this.tipData = [];
      console.log(data);
    },
  },
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
