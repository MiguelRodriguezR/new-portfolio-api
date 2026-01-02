const mongoose = require("mongoose");

const ExperienceSchema = mongoose.Schema({
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, 
  position: { type: Number, required: true }, 
  projects: [
    {
      projectName: { type: String, required: true },
      client: { type: String, required: true },
      clientLogo: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      participationDetails: { type: String, required: true },
      technologies: [{ type: String }], 
      link: { type: String },
    },
  ],
});

module.exports = mongoose.model("Experience", ExperienceSchema);
