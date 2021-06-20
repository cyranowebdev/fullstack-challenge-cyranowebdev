const session = require('./session.services');
const users = require('./users.services');
const admin = require('./admin.services');
const directors = require('./directors.services');
const teachers = require('./teachers.services');
const students = require('./students.services');

module.exports = {
  session,
  users,
  admin,
  directors,
  teachers,
  students,
};
