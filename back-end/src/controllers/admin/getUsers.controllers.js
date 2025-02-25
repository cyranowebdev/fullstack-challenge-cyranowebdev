const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { adminError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const directors = await admin.getUsers();
    return res.status(StatusCodes.OK).json(directors);
  } catch (err) {
    return next({ ...adminError, err });
  }
};
