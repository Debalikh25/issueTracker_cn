const express = require('express');
const projectController = require('../controllers/project-controller')
const issueController = require('../controllers/issue-controller')
const Router = express.Router();

Router.get("/" , projectController.renderHome)
Router.get("/create-project" , projectController.renderCreateProjectPage)
Router.post("/create-project" , projectController.createProject)
Router.get("/project-details/:id" , projectController.getDetailsPage)
Router.post("/project/:id/create-issue" , issueController.createIssue)

module.exports = Router;