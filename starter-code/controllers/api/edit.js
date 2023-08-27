const User = require("../../models/user");

module.exports = {
  updateProfile,
};

async function updateProfile(req, res) {
  try {
    console.log("Updating profile");
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();

    res.json({ name: req.user.name });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
