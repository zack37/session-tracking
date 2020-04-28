import shortid from 'shortid';
import sql from 'sql-query';
import client from './sql-client';

const sqlQuery = sql.Query('postgresql');

/**
 * "Base" functions for fetching data from postgres
 * Each function is curried to take the table name as an argument
 * All "implementing" manager should explicitly include each function
 */

/**
 * Queries for `params` and returns all results
 */
export const getAll = table => async params => {
  const query = sqlQuery
    .select()
    .from(table)
    .where(params)
    .build();

  const response = await client.query(query);

  return response.rows;
};

export const getById = table => async id => {
  return findOne(table)({ id });
};

export const findOne = table => async params => {
  const query = sqlQuery
    .select()
    .from(table)
    .where(params)
    .limit(1)
    .build();

  const response = await client.query(query);

  return response.rows[0];
};

export const create = table => async fields => {
  const id = shortid.generate();
  const query = sqlQuery
    .insert()
    .into(table)
    .set({ id, ...fields })
    .build();

  await client.query(query);

  return getById(id);
};

export const update = table => async (fields, filter) => {
  const query = sqlQuery
    .update()
    .into(table)
    .set(fields)
    .where(filter)
    .build();

  return client.query(query);
};
