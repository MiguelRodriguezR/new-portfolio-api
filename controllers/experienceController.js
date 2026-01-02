const Experience = require("../models/Experience");

exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ position: 1 });
    res.json({ experiences });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};
