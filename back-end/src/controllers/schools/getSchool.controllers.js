const { StatusCodes } = require('http-status-codes');
const { schools } = require('../../services');
const { schoolsError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { body: { schoolId }, userId } = req;
    const school = await schools.getById(schoolId, userId);
    return res.status(StatusCodes.OK).json(school);
  } catch (err) {
    return next({ ...schoolsError, err });
  }
};
