/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
const ObjectId = require('mongodb').ObjectID;
const connection = require('./connection');

const getBySchoolId = async (schoolId) => {
  const schoolObjId = ObjectId(schoolId);
  const results = await connection()
    .then((db) => db.collection('classes').aggregate([
      { $match: { schoolId: schoolObjId } },
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
  const classObjId = ObjectId(classId);
  const result = await connection()
    .then((db) => db.collection('classes').findOne({ _id: classObjId }));

  return result;
};

const create = async (newClass) => {
  const objClass = {
    ...newClass,
    schoolId: ObjectId(newClass.schoolId),
    teachers: newClass.teachers.map((teacher) => {
      if (teacher) return ObjectId(teacher);
      return null;
    }),
  };
  const result = await connection()
    .then((db) => db.collection('classes').insertOne(objClass));
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
  const newComment = { msg: payload.msg, teacher: ObjectId(userId) };
  const classObjId = ObjectId(payload.classId);
  const { matchedCount, result: { nModified } } = await connection()
    .then((db) => db.collection('classes').updateOne(
      { _id: classObjId },
      { $push: { comments: newComment } },
    ));
  if (matchedCount === 0) return null;
  return (nModified > 0) ? newComment : 0;
};

const getByTeacher = async (teacherId) => {
  const teacherObjId = ObjectId(teacherId);
  const results = await connection()
    .then((db) => db.collection('classes').aggregate([
      { $match: { teachers: teacherObjId } },
      {
        $lookup: {
          from: 'schools',
          localField: 'schoolId',
          foreignField: '_id',
          as: 'school',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'school.director',
          foreignField: '_id',
          as: 'director',
        },
      },
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
          school: 1,
          director: 1,
          year: 1,
          class: 1,
          grade: 1,
          teachers: 1,
          students: 1,
          comments: 1,
        },
      },
    ]).toArray());

  const cleanResults = [];
  results.forEach((result) => {
    const { _id: id, ...data } = result;
    const { _id: schoolId, ...schoolData } = result.school[0];
    const clearSchool = { id: schoolId, ...schoolData };
    const { name, email } = result.director[0];
    const resultTeachers = result.teachers.map((teacher) => ({
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
    }));
    cleanResults.push({
      id,
      ...data,
      teachers: resultTeachers,
      school: clearSchool,
      director: { name, email },
    });
  });

  return cleanResults;
};

module.exports = {
  addComment,
  getBySchoolId,
  getById,
  getByTeacher,
  create,
  update,
  remove,
};
