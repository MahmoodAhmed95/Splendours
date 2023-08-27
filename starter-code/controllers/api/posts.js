// const category = require("../../models/category");
const cloudinary = require("../../config/cloudinary");
const Post = require("../../models/post");

module.exports = {
  addPost,
  deletePost,
  showPost,
};
async function showPost(req, res) {
  try {
    const posts = await Post.find({});
    // console.log(categories);
    res.json(posts);
  } catch (err) {
    res.status(401).json({ message: "Error While Showing The posts" });
  }
}
async function addPost(req, res) {
  const image = req.body.image;
  // this is an object containing the image details and url
  const uploadedResponse = await cloudinary.uploader.upload(image);
  const post = {
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId,
    bidCost: req.body.bidCost,
    endDate: req.body.endDate,
    image: uploadedResponse.url,
    user: req.user,
    increment: req.body.increment,
  };
  try {
    const postName = await Post.findOne({ name: req.body.name });
    if (postName) {
      res.json({ message: "Name already exist" });
    } else {
      const newP = await Post.create(post);
      res.json(newP);
    }
  } catch (error) {
    res.json({ message: "Error Adding Post Failed Try Again" });
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    // Remove the Category from DB
    post.deleteOne(post);

    // Save the updated category document
    await post.save();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
