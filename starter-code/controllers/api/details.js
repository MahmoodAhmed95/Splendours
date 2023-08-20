const Item = require("../../models/post");

module.exports = {
  showDetails,
};

async function showDetails(req, res) {
  const item = await Item.findById(req.params.id);
  // console.log(categories);
  res.json(item);
}
