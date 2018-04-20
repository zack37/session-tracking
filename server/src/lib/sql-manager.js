import Sequelize from 'sequelize';
import { generate } from 'shortid';
import sqlClient from './sql-client';

export function define(modelName, fields) {
  return sqlClient.define(modelName, {
    _id: {
      type: Sequelize.STRING,
      defaultValue: generate,
      primaryKey: true,
    },
    ...fields,
  });
}

export async function count(model, params = {}) {
  return await model.count({ where: params });
}

export async function query(model, params = {}) {
  return await model.findAll({ where: params });
}

export async function byId(model, id) {
  return await model.findById(id);
}

export async function find(model, params = {}) {
  return await model.findOne({ where: params });
}

export async function insert(model, data) {
  return await model.create(data);
}
