const express = require("express");
const router = express.Router();
const multer = require("multer");
const Trustee = require("../../models/Trustee");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Handle POST request to /api/trustee/save
router.post("/save", upload.single("avatar"), async (req, res) => {
  try {
    const newTrustee = new Trustee({
      fullName: req.body.fullName,
      title: req.body.title,
      linkedin: req.body.linkedin,
      avatar: req.file ? req.file.path : null,
    });

    const savedTrustee = await newTrustee.save();
    res.json(savedTrustee);
  } catch (error) {
    console.error("An error occurred while saving trustee data:", error);
    res.status(500).send("An error occurred while saving trustee data");
  }
});

router.get("/get", async (req, res) => {
  try {
    // Fetch all trustees including their avatar URLs
    const trustees = await Trustee.find().lean();

    res.json(trustees);
  } catch (error) {
    console.error("An error occurred while retrieving trustees:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving trustees." });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const result = await Trustee.findByIdAndDelete(req.body.id)
    res.json(result)
  } catch (error) {
    console.error(`Error during /delete route processing: ${error.message}`);
    res.status(500).send("Server error");
  }
});

module.exports = router;
