const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = {
  create,
  login,
  checkToken,
};

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ message: "Email incorrect" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      user.attempt += 1; // Increase the attempt count by 1
      await user.save();
      if (user.attempt === 1) {
        return res.json({
          message: "Log In Failed Attempt 1 of 3 - Try Again",
        });
      }
      if (user.attempt === 2) {
        return res.json({
          message: "Log In Failed Attempt 2 of 3 - Try Again",
        });
      }
      if (user.attempt === 3) {
        return res.json({
          message: "Log In Failed Attempt 3 of 3 - Try Again",
        });
      }
      if (user.attempt > 3) {
        return res.json({
          message: "You exceeded The Attempt Limit Please Rest Your Password",
        });
      }
    }
    if (user.attempt > 3) {
      return res.json({
        message: "You exceeded The Attempt Limit Please Rest Your Password",
      });
    }
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(500).json({ message: "Bad Credentials" });
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    // The token is a string, but yes, we can
    // res.json a string
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

/*-- Helper Functions --*/
function createJWT(user) {
  return jwt.sign(
    // extra data for the payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
