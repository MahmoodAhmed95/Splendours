const cron = require("node-cron");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");

// Connect to the database
mongoose.connect(process.env.DATABASE_URL);

// Set up the cron job
cron.schedule("0 * * * *", async () => {
  console.log(`Cron shit`);
  try {
    const currentTime = new Date();
    const expiredPosts = await Post.find({ endDate: { $lte: currentTime } });
    console.log(`expired posts =====> ${expiredPosts}`);
    for (let i = 0; i < expiredPosts.length; i++) {
      const post = expiredPosts[i];
      const user = await User.findById(post.user);

      if (user) {
        for (let j = 0; j < user.bookMarks.length; j++) {
          if (user.bookMarks[j].equals(post._id)) {
            user.bookMarks.splice(j, 1);
            j--;
          }
        }

        for (let j = 0; j < user.userBids.length; j++) {
          if (user.userBids[j].equals(post._id)) {
            user.userBids.splice(j, 1);
            j--;
          }
        }

        await user.save();
      }

      await post.remove();
    }
  } catch (error) {
    console.error("Cron Job Error:", error);
  }
});
