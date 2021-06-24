const { StatusCodes } = require('http-status-codes');
const { users } = require('../../services');
const { registerError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { body: { userId } } = req;
    const user = await users.getById(userId);
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return next({ ...registerError, err });
  }
};
