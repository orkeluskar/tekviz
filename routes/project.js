const express = require('express');
const router = express.Router();

//importing projects controller
const project = require('../controllers/project/project');

//importing discussion controller
const comment = require('../controllers/project/comment');

//Adding client to the project
const projectClient = require('../controllers/project/projectClient');

//Project CRUD routes
router.post('/project', project.viewProjects);
router.post('/project/add', project.addProject);
router.post('/project/delete', project.deleteProject);
router.post('/projectclient', projectClient.viewProjects);
router.post('/project/users', projectClient.viewprojectusers);

//Comment CRUD routes
router.post('/comment/add', comment.addComment);
router.post('/comment', comment.viewComment);

// All project details from related tables
router.post('/project/info', project.viewProject);
router.post('/projectclient/info', projectClient.viewProject);

// All project details from related tables
router.post('/client/add', project.addClient);

//updateproject
router.post('/project/update', project.updateProject);

//delete comments
router.post('/deletecomment', comment.deleteComment);

//All metadata here
router.post('/project/metadata', project.viewProjectMetaData);
router.post('/project/metadata/allow', project.approveFile);

module.exports = router;