const Project  = require('../models/Project')

exports.getProjects = async (req, res) =>{
    try {
        const projects = await Project.find();
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('internal error')
    }
}