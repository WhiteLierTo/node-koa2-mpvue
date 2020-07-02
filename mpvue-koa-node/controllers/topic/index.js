const { mysql } = require("../../mysql");

async function listAction(ctx) {
  const page = ctx.query.page || 1;
  const size = 5;
  //分页处理
  const data = await mysql("nideshop_topic")
    .column("id", "title", "price_info", "subtitle", "scene_pic_url")
    .limit(size)
    .offset((page - 1) * size);
  const data1 = await mysql("nideshop_topic")
    .column("id", "title", "price_info", "subtitle", "scene_pic_url")
    .select();
  const total = parseInt(data1.length / 5);
  ctx.body = {
    page,
    total,
    data,
  };
}
async function detailAction(ctx) {
  const id = ctx.query.id;
  let data = [];
  if (id) {
    data = await mysql("nideshop_topic")
      .where({
        id: id,
      })
      .select();
  }
  const recommendList = await mysql("nideshop_topic")
    .column("id", "title", "price_info", "subtitle", "scene_pic_url")
    .limit(4)
    .select();
  ctx.body = {
    data: data[0],
    recommendList,
  };
}

module.exports = {
  listAction,
  detailAction,
};
