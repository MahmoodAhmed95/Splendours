const User = require("../../models/user");

module.exports = {
  resetPass,
};

async function resetPass(req, res) {
  try {
    console.log("Reseting PassWord");
    console.log(req.user);

    const { name, email, address, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.name === name &&
      user.email === email &&
      user.address === address
    ) {
      user.password = password;
      user.attempt = 0;
      await user.save();
      res.json({ message: "Password Updated Successfully" });
    } else {
      res.json({ message: "Invalid information for password reset" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
