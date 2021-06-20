const ObjectId = require('mongodb').ObjectID;
const { schools } = require('../models');
const { authSchoolId } = require('../schemas');

const error = {
  schoolNotFound: 'C_ERR_SCHOOL_NOT_FOUND',
  notDirector: 'C_ERR_SCHOOL_NOT_DIRECTOR',
};

const getById = async (schoolId, userId) => {
  authSchoolId(schoolId);
  const school = await schools.getById(schoolId);
  if (!school) throw new Error(error.schoolNotFound);
  const user = ObjectId(userId);
  const schoolDirectorId = ObjectId(school.director);
  if (!schoolDirectorId.equals(user)) throw new Error(error.notDirector);
  return school;
};

module.exports = {
  getById,
};
