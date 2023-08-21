const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = {
  update: updatePass,
};
async function updatePass(req, res) {
  try {
    const user = await User.updatePass(req.body);
    const token = createJWT(user);
    // The token is a string, but yes, we can
    // res.json a string
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}
function createJWT(user) {
  return jwt.sign(
    // extra data for the payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
