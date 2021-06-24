const express = require('express');
const controllers = require('../controllers/teacher');
const middlewares = require('../middlewares');

const teachers = express.Router();

teachers.get('/',
  middlewares.authToken, middlewares.authTeacher, controllers.getClasses);

teachers.get('/school',
  middlewares.authToken, middlewares.authTeacher, controllers.getSchool);

teachers.post('/class',
  middlewares.authToken, middlewares.authTeacher, controllers.updateClass);

teachers.post('/student',
  middlewares.authToken, middlewares.authTeacher, controllers.createStudent);

teachers.get('/students',
  middlewares.authToken, middlewares.authTeacher, controllers.getStudentComments);
teachers.put('/students',
  middlewares.authToken, middlewares.authTeacher, controllers.updateStudent);
teachers.delete('/students',
  middlewares.authToken, middlewares.authTeacher, controllers.removeStudent);

module.exports = teachers;
