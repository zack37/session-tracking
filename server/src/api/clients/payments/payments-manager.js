import mongoManager from '../../../lib/mongo-manager';

async function create(db, clientId) {
  return await db.insert({ _id: clientId, paymentLog: [] });
}

async function insert(db, clientId, payment) {
  const exists = await mongoManager.byId(db, clientId);

  if(!exists) {
    return await db.insert({ _id: clientId, paymentLog: [ payment ] });
  }

  return await db.updateOne(
    { _id: clientId },
    { $push: { paymentLog: payment } }
  );
}

export default {
  ...mongoManager,
  withConnection: mongoManager.withConnection('payments'),
  insert,
  create,
};
