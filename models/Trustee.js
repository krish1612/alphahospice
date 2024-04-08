const mongoose = require("mongoose");

const TrusteeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("trustee", TrusteeSchema);
