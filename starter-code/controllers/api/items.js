const Item = require("../../models/post");

async function index(req, res) {
  console.log(`INSIDE`);
  const items = await Item.find({}).sort("name").populate("category").exec();
  console.log(`items ====> ${items}`);
  // re-sort based upon the sortOrder of the categories
  items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(items);
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  res.json(item);
}

module.exports = {
  index,
  show,
};
