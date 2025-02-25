/* eslint-disable complexity */
const {
  isBlank,
  isNotString } = require('./helpers');

const error = {
  missingStudent: 'C_ERR_STUDENT_MISSING',
  invalidStudent: 'C_ERR_STUDENT_INVALID',
};

const authNewStudent = (newStudent) => {
  switch (true) {
    case isBlank(newStudent.name): throw new Error(error.missingStudent);
    case isNotString(newStudent.name): throw new Error(error.invalidStudent);
    default: return null;
  }
};

module.exports = authNewStudent;
