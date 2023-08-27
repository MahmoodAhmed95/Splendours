const Post = require("../../models/post");
const User = require("../../models/user");

module.exports = {
  addToBookMark,
  getBookMarks,
  deleteBookMark,
  setNewBid,
  setPrevBid,
  getBids,
  getAuctions,
  deleteAuction,
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

async function setNewBid(req, res) {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    const post = await Post.findById(itemId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // COMMENT THIS IF you want the current bidder to only bid once
    // if (post.currentBidder && post.currentBidder.equals(userId)) {
    //   return res
    //     .status(400)
    //     .json({ message: "You already have a bid on this post" });
    // }
    // updating the current bidder
    const update = { $set: { currentBidder: userId } };
    await Post.updateOne({ _id: itemId }, update);

    // updating the increment by the process.env
    // const newBid = parseInt(process.env.INCREMENT) + post.bidCost;
    // Umcomment down and comment up to change based on the increment
    const newBid = post.increment + post.bidCost;
    const bidUpdate = { $set: { bidCost: newBid } };
    await Post.updateOne({ _id: itemId }, bidUpdate);
    console.log(`this is the new bid cost =====>`);
    console.log(Post);
    const user = await User.findById(userId);

    // pushing the objectid of the post to the array of userBids in the user schema
    if (!user.userBids.includes(itemId)) {
      user.userBids.push(itemId);
      // Save the updated user object
      await user.save();
    }
    // Create response object with user and post data
    const response = {
      user: user,
      post: post,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function setPrevBid(req, res) {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    const post = await Post.findById(itemId);
    if (!post) {
      return res.status(404).json({ message: "User not found" });
    }
    if (post.currentBidder === userId) {
      return res
        .status(400)
        .json({ message: "You already have a bid on this" });
    }

    const prevBidder = post.currentBidder;

    const user = await User.findById(prevBidder);
    console.log(`user====>`);
    console.log(user);
    if (user) {
      res.json(user.name);
    } else {
      res.json("No current Bidder");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getBids(req, res) {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("userBids");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bids = user.userBids;

    const currentBidders = bids.map((bid) => {
      return User.findById(bid.currentBidder);
    });

    Promise.all(currentBidders)
      .then((currentBiddersData) => {
        const response = {
          bids: bids,
          currentBidders: currentBiddersData,
        };
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAuctions(req, res) {
  try {
    const userId = req.user._id;
    // Find all documents where the user matches the userId and populate the currentBidder field
    const auctions = await Post.find({ user: userId }).populate(
      "currentBidder"
    );
    res.status(200).json(auctions);
  } catch (error) {
    console.log("Error Getting Auctions");
  }
}

async function deleteAuction(req, res) {
  try {
    const userId = req.user._id;
    const auctionId = req.params.id;
    const post = await Post.findOne({ _id: auctionId, user: userId });

    await post.remove();
  } catch (error) {
    console.error("Error deleting auction:", error);
    res.status(500).json({ message: "Error deleting auction." });
  }
}