const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
  },
  {
    timestamps: true,
  }
);
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    bidCost: {
      type: Number,
      default: 50,
    },
    startDate: {
      type: Date,
      default: Date,
    },
    endDate: {
      type: Date,
      default: Date,
    },
    timeDuration: {
      type: String,
      default: "Not specified",
    },
    profile_img: String,
    cloudinary_id: String,
    reviews: [reviewSchema],

    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // userName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
