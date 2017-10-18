/**
 * Base manager for mongo connections. Supplies basic operations useful to all
 * mongo interactions
 */

import bluebird from 'bluebird';
import curry from 'lodash/curry';
import mongoClient from './mongo-client';
import shortid from 'shortid';

/*=============== PRIVATE ===============*/
function queryBase(db, query = {}) {
  const { page = 1, limit, ...rest } = query;

  let cursor = db.find(rest);

  if (limit) {
    cursor = cursor.skip((page - 1) * limit).limit(limit);
  }

  return cursor;
}
/*=============== END PRIVATE ===============*/

/*=============== PUBLIC ===============*/
async function count(db, query = {}) {
  return await queryBase(db, query).count();
}

async function query(db, query = {}) {
  return await queryBase(db, query).toArray();
}

async function byId(db, id) {
  return await db.findOne({ _id: id });
}

async function insert(db, data) {
  const model = { ...data, _id: shortid.generate() };

  await db.insertOne(model);

  return model;
}

/**
 * Executes `fn` with a mongo connection
 * 
 * @param {Function} fn function to execute within the context of a mongo connection
 * @returns {Promise} The result of `fn` after closing the mongodb connection
 */
function withConnection(collectionName, fn) {
  return bluebird.using(mongoClient(), async connection => {
    const collection = await connection.collection(collectionName);

    return await fn(collection);
  });
}
/*=============== END PUBLIC ===============*/

export default {
  count,
  query,
  byId,
  insert,
  withConnection: curry(withConnection, 2),
};
