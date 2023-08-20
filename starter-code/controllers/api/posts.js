// const cloudinary = require("../utils/cloudinary");

// const category = require("../../models/category");
const Post = require("../../models/post");

module.exports = {
  addPost,
};
async function addPost(req, res) {
  //   const result = await cloudinary.uploader.upload(req.file.path);
  //   req.body.profile_img = result.secure_url;
  //   req.body.cloudinary_id = result.public_id;
  const post = {
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId,
    bidCost: req.body.bidCost,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    timeDuration: req.body.timeDuration,
    profile_img: req.body.profile_img,
  };
  console.log(post);
  try {
    const postName = await Post.findOne({ name: req.body.name });
    if (postName) {
      res.json("Name already exist");
    } else {
      console.log("before");
      const newP = await Post.create(post);
      console.log("hello");
      console.log(newP);
      res.json(newP);
    }
  } catch (error) {
    res.json("error");
  }
}
