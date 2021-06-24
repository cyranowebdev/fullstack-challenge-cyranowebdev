/* eslint-disable max-lines-per-function */
const ObjectId = require('mongodb').ObjectID;
const connection = require('./connection');

const getByClassId = async (classId) => {
  const classObjId = ObjectId(classId);
  const result = await connection()
    .then((db) => db.collection('classes').findOne(
      { _id: classObjId },
    ));
  if (!result) return null;
  return (result.students) ? result.students : [];
};

const create = async (payload) => {
  const classObjId = ObjectId(payload.classId);
  const newStudent = { name: payload.name, comments: [] };
  const { matchedCount, result: { nModified } } = await connection()
    .then((db) => db.collection('classes').updateOne(
      { _id: classObjId },
      { $push: { students: newStudent } },
    ));
  if (matchedCount === 0) return null;
  return (nModified > 0) ? newStudent : 0;
};

const addComment = async (payload, userId) => {
  const classObjId = ObjectId(payload.classId);
  const newComment = { msg: payload.msg, teacher: userId };
  const { matchedCount, result: { nModified } } = await connection()
    .then((db) => db.collection('classes').updateOne(
      { _id: classObjId },
      { $push: { 'students.$[element].comments': newComment } },
      { arrayFilters: [{ 'element.name': payload.name }] },
    ));
  if (matchedCount === 0) return null;
  return (nModified > 0) ? newComment : 0;
};

const remove = async (classId, name) => {
  const classObjId = ObjectId(classId);
  const { matchedCount, result: { nModified } } = await connection()
    .then((db) => db.collection('classes').updateOne(
      { _id: classObjId },
      { $pull:
        { students: { name } },
      },
    ));
  if (matchedCount === 0) return null;
  return (nModified > 0) ? name : 0;
};

module.exports = {
  getByClassId,
  create,
  addComment,
  remove,
};
