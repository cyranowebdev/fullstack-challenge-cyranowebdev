/* eslint-disable max-lines-per-function */
const ObjectId = require('mongodb').ObjectID;
const connection = require('./connection');

const getAll = async () => {
  const results = await connection()
    .then((db) => db.collection('schools').find().toArray())
    .catch((err) => err);

  const camelResults = results.map((result) => {
    const { _id: id, ...data } = result;
    return { id, ...data };
  });
  return camelResults;
};

const getById = async (schoolId) => {
  const schoolObjId = ObjectId(schoolId);
  const result = await connection()
    .then((db) => db.collection('schools').findOne({ _id: schoolObjId }));

  return result;
};

const getByDirectorId = async (userId) => {
  const userObjId = ObjectId(userId);
  const result = await connection()
    .then((db) => db.collection('schools').aggregate([
      { $match: { director: userObjId } },
      {
        $lookup: {
          from: 'classes',
          localField: '_id',
          foreignField: 'schoolId',
          as: 'classes',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          address: 1,
          type: 1,
          director: 1,
          status: 1,
          classes: 1,
        },
      },
    ]).toArray());

  if (result.length > 0) {
    const { _id: id, ...data } = result[0];
    return { id, ...data };
  }
  return {};
};

const create = async (newSchool) => {
  const status = Boolean(newSchool.director);
  const schoolObj = { ...newSchool };
  if (status) {
    schoolObj.director = ObjectId(newSchool.director);
  }
  const result = await connection()
    .then((db) => db.collection('schools').insertOne(
      { ...schoolObj, status },
    ));

  if (result) {
    const schoolCreated = {
      name: result.ops[0].name,
      address: result.ops[0].address,
      type: result.ops[0].type,
      director: result.ops[0].director,
    };
    return schoolCreated;
  }
  return null;
};

const update = async (school, schoolId) => {
  const schoolObjId = ObjectId(schoolId);
  const status = Boolean(school.director);
  const schoolObj = { ...school };
  if (status) {
    schoolObj.director = ObjectId(school.director);
  }
  const { matchedCount, result: { nModified } } = await connection()
    .then((db) => db.collection('schools').updateOne(
      { _id: schoolObjId },
      { $set: { ...schoolObj, status } },
    ));
  if (matchedCount === 0) return null;
  return (nModified > 0) ? school : 0;
};

const remove = async (schoolId) => {
  const schoolObjId = ObjectId(schoolId);
  const result = await connection()
    .then((db) => db.collection('schools').deleteOne(
      { _id: schoolObjId },
    ));
    await connection()
    .then((db) => db.collection('classes').deleteMany(
      { schoolId },
    ));

  return result;
};

module.exports = {
  getAll,
  getById,
  getByDirectorId,
  create,
  update,
  remove,
};
