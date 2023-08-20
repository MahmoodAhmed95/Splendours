const Category = require("../../models/category");

module.exports = {
  addCategory,
  showCategory,
};
async function addCategory(req, res) {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
  });
  try {
    const categoryName = await Category.findOne({ name: req.body.name });
    if (categoryName) {
      res.json("Name already exist");
    } else {
      const catg = await category.save();
      res.json(catg);
    }
  } catch (error) {
    res.json("error");
  }
}
async function showCategory(req, res) {
  const categories = await Category.find({});
  // console.log(categories);
  res.json(categories);
}
