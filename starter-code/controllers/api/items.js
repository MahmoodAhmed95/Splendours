const Item = require("../../models/post");

async function index(req, res) {
  const userId = req.user._id;
  try {
    // console.log("INSIDE");
    const items = await Item.find({ user: { $ne: userId } })
      .sort("name")
      .populate("categoryId")
      .exec();

    // Sort items based on the sortOrder of the categories
    // items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);

    // console.log("items ====>", items);

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  // console.log(`item ====> ${item}`);
  res.json(item);
}

module.exports = {
  index,
  show,
};
