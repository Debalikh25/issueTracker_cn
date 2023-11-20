const Project = require("../models/project");
const Issue = require("../models/issue");

//POST -> Creates an issue in a particular project
module.exports.createIssue = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const newIssue = await Issue.create({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      labels: req.body.labels.split(","),
    });
    project.issues.push(newIssue);

    await project.save();

    if (req.xhr) {
      return res.status(200).json({
        message: "Issue Created !",
        issue: newIssue,
      });
    }

    return res.render("project-details", {
      title: project.name,
      project: project,
    });
  } catch (err) {
    console.log(err);
    if (req.xhr) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.render("error");
  }
};
