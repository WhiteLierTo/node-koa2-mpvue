const { mysql } = require("../../mysql");

//商品详情页数据
async function detailAction(ctx) {
  const goodsId = ctx.query.id;
  const openId = ctx.query.openId;
  //商品信息
  const info = await mysql("nideshop_goods")
    .where({
      id: goodsId,
    })
    .select();
  //获取商品图片
  const gallery = await mysql("nideshop_goods_gallery").where({
    goods_id: goodsId,
  });
  ctx.body = {
    info,
    gallery,
  };
}

module.exports = {
  detailAction,
};
