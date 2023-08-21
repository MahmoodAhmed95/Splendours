// const category = require("../../models/category");
const Post = require("../../models/post");
// const cloudinary = require("../../utils/cloudinary");

module.exports = {
  addPost,
};
async function addPost(req, res) {
  // console.log(` User ==> `);
  // console.log(req.user);
  const post = {
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId,
    bidCost: req.body.bidCost,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    timeDuration: req.body.timeDuration,
    profile_img: req.body.profile_img,
    user: req.user,
    // profile_img: result.secure_url, // Save the image URL from Cloudinary
    // cloudinary_id: result.public_id, // Save the public ID from Cloudinary
  };

  // const result = await cloudinary.uploader.upload(req.file.path);
  // req.body.profile_img = result.secure_url;
  // req.body.cloudinary_id = result.public_id;
  // console.log(post);
  try {
    const postName = await Post.findOne({ name: req.body.name });
    if (postName) {
      res.json("Name already exist");
    } else {
      // console.log("before");
      const newP = await Post.create(post);
      // console.log("hello");
      // console.log(newP);
      res.json(newP);
    }
  } catch (error) {
    console.log(error);
    res.json("error");
  }
}
