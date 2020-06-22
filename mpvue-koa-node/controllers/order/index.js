const { mysql } = require("../../mysql");

async function submitAction(ctx) {
  const { openId, goodsId, allPrice } = ctx.request.body;
  //判断是否存在订单
  const isOrder = await mysql("nideshop_order")
    .where({
      user_id: openId,
    })
    .select();

  if (isOrder.length > 0) {
    const data = await mysql("nideshop_order")
      .where({
        user_id: openId,
      })
      .update({
        user_id: openId,
        goods_id: goodsId,
        allPrice: allPrice,
      });
    if (data) {
      ctx.body = {
        data: "true",
      };
    } else {
      ctx.body = {
        data: "false",
      };
    }
  } else {
    const data = await mysql("nideshop_order")
      .where({
        user_id: openId,
      })
      .insert({
        user_id: openId,
        goods_id: goodsId,
        allPrice: allPrice,
      });
    if (data) {
      ctx.body = {
        data: "true",
      };
    } else {
      ctx.body = {
        data: "false",
      };
    }
  }
}

module.exports = {
  submitAction,
};
