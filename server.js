const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/brick", require("./routes/api/brick"));
app.use("/api/donor", require("./routes/api/donor"));
app.use("/api/payment", require("./routes/api/payment"));
app.use("/api/upload", require("./routes/api/fileUpload"));
app.use("/api/content", require("./routes/api/content"));
app.use("/api/supportWord", require("./routes/api/supportWord"));
app.use("/api/social", require("./routes/api/socialMedia"));
app.use("/api/trustee", require("./routes/api/trustee"));

app.use("/uploads", express.static("./uploads"));
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
});
