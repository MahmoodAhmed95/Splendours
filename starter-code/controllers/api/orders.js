const Order = require("../../models/post");
const User = require("../../models/user");

module.exports = {
  addToBookMark,
  getBookMarks,
  deleteBookMark,
};

async function addToBookMark(req, res) {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the post already exists in bookmarks
    if (user.bookMarks.includes(postId)) {
      return res.status(400).json({ message: "Post already bookmarked" });
    }

    // Add the post ID to the bookmarks array
    user.bookMarks.push(postId);

    // Save the updated user document
    await user.save();

    // Return the updated bookmarks
    // right here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getBookMarks(req, res) {
  try {
    const userId = req.user._id;

    // Assuming you have a reference to the User model
    const user = await User.findById(userId).populate("bookMarks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarks = user.bookMarks;
    res.json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteBookMark(req, res) {
  try {
    const userId = req.user._id;
    const bookmarkId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the bookmark exists in the user's bookmarks
    const bookmarkIndex = user.bookMarks.indexOf(bookmarkId);
    if (bookmarkIndex === -1) {
      return res.status(400).json({ message: "Bookmark not found" });
    }

    // Remove the bookmark from the array
    user.bookMarks.splice(bookmarkIndex, 1);

    // Save the updated user document
    await user.save();

    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
