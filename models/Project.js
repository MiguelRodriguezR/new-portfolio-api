const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  languages: { type: String, required: true },
  image: { type: String, required: true },
  plink: { type: String, required: true },
  ghlink: { type: String, required: true },
});

module.exports = mongoose.model("Project", ProjectSchema);