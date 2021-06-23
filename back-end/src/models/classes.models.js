/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
const ObjectId = require('mongodb').ObjectID;
const connection = require('./connection');

const getBySchoolId = async (schoolId) => {
  const results = await connection()
    .then((db) => db.collection('classes').aggregate([
      { $match: { schoolId } },
      {
        $lookup: {
          from: 'users',
          localField: 'teachers',
          foreignField: '_id',
          as: 'teachers',
        },
      },
      {
        $project: {
          _id: 1,
          year: 1,
          grade: 1,
          class: 1,
          schoolId: 1,
          teachers: 1,
        },
      },
    ]).toArray());
    if (results) {
      const clearClasses = results.map((element) => {
        const thisClass = { ...element };
        const { _id: id } = thisClass;
        delete thisClass._id;
        const clearTeachers = thisClass.teachers.map((teacher) => {
          if (teacher) {
            return ({
              name: teacher.name,
              email: teacher.email,
            });
          }
          return null;
        });
        return { id, ...thisClass, teachers: clearTeachers };
      });

      return clearClasses;
    }
  return results;
};

const getById = async (classId) => {
  const result = await connection()
    .then((db) => db.collection('classes').findOne({ _id: ObjectId(classId) }));

  return result;
};

const create = async (newClass) => {
  const teachers = newClass.teachers.map((teacher) => {
    if (teacher) return ObjectId(teacher);
    return null;
  });
  const createClass = { ...newClass, teachers };
  const result = await connection()
    .then((db) => db.collection('classes').insertOne(createClass));
  if (result) {
      const classCreated = { ...result.ops[0] };
      return classCreated;
    }
  return result;
};

const update = async (classId, field, value) => {
  const updateField = {};
  const set = {};
  if (field !== 'teachers') {
    updateField[field] = value;
  }
  if (field === 'teachers') {
    updateField.teachers = value.map((teacher) => {
      if (teacher) return ObjectId(teacher);
      return null;
    });
  }
  set.$set = updateField;
  const { matchedCount, result: { nModified } } = await connection()
    .then((db) => db.collection('classes').updateOne(
      { _id: ObjectId(classId) },
      set,
    ));
  if (matchedCount === 0) return null;
  return (nModified) ? value : 0;
};

const remove = async (classId) => {
  const result = await connection()
    .then((db) => db.collection('classes').deleteOne(
      { _id: ObjectId(classId) },
    ));

  return result.deletedCount > 0;
};

const addComment = async (payload, userId) => {
  const newComment = { msg: payload.msg, teacher: userId };
  const { matchedCount, result: { nModified } } = await connection()
    .then((db) => db.collection('classes').updateOne(
      { _id: ObjectId(payload.classId) },
      { $push: { comments: newComment } },
    ));
  if (matchedCount === 0) return null;
  return (nModified > 0) ? newComment : 0;
};

module.exports = {
  addComment,
  getBySchoolId,
  getById,
  create,
  update,
  remove,
};
