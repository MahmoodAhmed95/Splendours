const Category = require("../../models/category");

module.exports = {
  addCategory,
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
