import mongoManager from '../../../lib/mongo-manager';

async function insert(db, clientId, session) {
  const exists = await mongoManager.byId(db, clientId);

  if(!exists) {
    return await db.insert({ _id: clientId, paymentLog: [ session ] });
  }

  return await db.updateOne(
    { _id: clientId },
    { $push: { paymentLog: session } }
  );
}

export default {
  ...mongoManager,
  withConnection: mongoManager.withConnection('payments'),
  insert,
};
