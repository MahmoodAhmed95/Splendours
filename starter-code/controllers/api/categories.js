const Category = require("../../models/category");
const Post = require("../../models/post");
module.exports = {
  addCategory,
  showCategory,
  deleteCategory,
};
async function addCategory(req, res) {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
  });
  try {
    const categoryName = await Category.findOne({ name: req.body.name });
    if (categoryName) {
      res.json({ message: "Name already exist" });
    } else {
      const catg = await category.save();
      res.json({ message: "Category Added Successfully" });
    }
  } catch (error) {
    res.json({ message: "Error While Adding Category" });
  }
}
async function showCategory(req, res) {
  try {
    const categories = await Category.find({});
    // console.log(categories);
    res.json(categories);
  } catch (err) {
    res.status(401).json({ message: "Error in Showing Categories" });
  }
}
async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.id;

    const Checker = await Post.exists({ categoryId: categoryId });
    const category = await Category.findById(categoryId);
    if (Checker) {
      return res.json({ message: "Category Not Empty" });
    }
    if (!category) {
      return res.json({ message: "Category Not Found" });
    }
    // Remove the Category from DB
    category.deleteOne(category);

    // Save the updated category document
    await category.save();

    return res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Category" });
  }
}
