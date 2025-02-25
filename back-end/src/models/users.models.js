/* eslint-disable no-underscore-dangle */
const ObjectId = require('mongodb').ObjectID;
const connection = require('./connection');

const getAll = async () => {
  const results = await connection()
    .then((db) => db.collection('users').find().toArray())
    .catch((err) => err);

  return results;
};

const getById = async (userId) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ _id: ObjectId(userId) }));

  const user = {
    name: result.name,
    email: result.email,
  };
  return user;
};

const getByProfile = async (value) => {
  const results = await connection()
    .then((db) => db.collection('users').find({ profile: value }).toArray());
  if (results) {
    const camelResults = results.map((result) => {
      const { _id: id, name, email, profile } = result;
      return { id, name, email, profile };
    });
    return camelResults;
  }
  return results;
};

const getUserIdByEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  if (result) return result._id;
  return null;
};

const searchByProfile = async (field, query, prof) => {
  const results = await connection()
    .then((db) => db.collection('users').find(
      {
        $and: [
          { [field]: { $regex: query, $options: 'i' } },
          { profile: prof },
        ],
      },
    ).toArray());
  const mapResults = results.map((result) => (
    { name: result.name, email: result.email }
  ));
  return mapResults;
};

const create = async (newUser) => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne(newUser)
    .catch((err) => err));

  return result.insertedId;
};

const findUserByEmail = async (query) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email: query }))
    .catch((err) => err);
  if (result) {
    const { _id: id, ...user } = result;
    return { ...user, id };
  }
  return null;
};

const getUserProfile = async (userId) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ _id: ObjectId(userId) }))
    .catch((err) => err);
  if (result) {
    const { profile } = result;
    return profile;
  }
  return null;
};

const removeOne = async (userId) => {
  const result = await connection()
    .then((db) => db.collection('users').deleteOne({ _id: ObjectId(userId) }));

  return result;
};

module.exports = {
  getAll,
  getById,
  getByProfile,
  getUserIdByEmail,
  searchByProfile,
  create,
  findUserByEmail,
  getUserProfile,
  removeOne,
};
