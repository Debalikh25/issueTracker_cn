const Project = require("../models/project");

//GET -> Renders the home page with a list of projects
module.exports.renderHome = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.render("home", {
      title: "Home",
      empty: projects.length == 0,
      projects: projects,
    });
  } catch (err) {
    return res.render("home", {
      title: "Error",
    });
  }
};

//GET -> Renders 'create project page with a form to create a new project
module.exports.renderCreateProjectPage = (req, res) => {
  return res.render("create-project", {
    title: "Create Project",
  });
};

//POST -> Creates a project document in mongoDB database
module.exports.createProject = async (req, res) => {
  try {
    const data = req.body;

    if (req.xhr) {
      const newProject = await Project.create(data);
      return res.status(200).json({
        message: "Project created successfully",
        project: newProject,
      });
    }

    await Project.create(data);
    return res.render("home", {
      title: "Home",
    });
  } catch (err) {
    console.log(err);
    if (req.xhr) {
      return res.status(500).json({
        error: err.message,
      });
    }
    return res.render("home", {
      title: "Home",
    });
  }
};

//GET -> Renders project details page where user can create an issue
module.exports.getDetailsPage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("issues");
    return res.render("project-details", {
      title: project.name,
      project: project,
    });
  } catch (err) {}
};
