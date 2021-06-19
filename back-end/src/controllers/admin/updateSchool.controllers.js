const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { adminError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { body: { payload, schoolId } } = req;
    await admin.updateSchool(payload, schoolId);
    return res.status(StatusCodes.OK).json({
      message: 'Success',
      updatedTo: payload,
    });
  } catch (err) {
    console.log(err);
    return next({ ...adminError, err });
  }
};
