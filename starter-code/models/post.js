const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    bidCost: {
      type: Number,
      default: 50,
    },
    currentBidder: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    endDate: {
      type: Date,
      default: Date,
    },
    image: String,
    cloudinary_id: String,
    increment: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
