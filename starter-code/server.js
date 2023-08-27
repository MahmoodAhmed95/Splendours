const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

require("dotenv").config();
// Connect to db after the dotenv above
require("./config/database");
require("./config/cron");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(logger("dev"));
// Process data in body of request if
// Content-Type: 'application/json'
// and put that data on req.body
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require("./config/checkToken"));
// Put all API routes here (before the catch-all)
app.use("/api/users", require("./routes/api/users"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/categories", require("./routes/api/categories"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/details", require("./routes/api/details"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/edits", require("./routes/api/edits"));
app.use("/api/resets", require("./routes/api/resets"));
// "catch-all" route that will match all GET requests
// that don't match an API route defined above
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
