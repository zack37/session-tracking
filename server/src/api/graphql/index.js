import fs from 'fs';
import path from 'path';
import { GraphQLDateTime } from 'graphql-iso-date';
import * as trainersManager from '../trainers/trainer-manager';
import * as clientsManager from '../clients/client-manager';

export const typeDefs = fs.readFileSync(
  path.resolve(__dirname, './schema.graphql'),
  { encoding: 'utf8' },
);

export const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    trainers: () => trainersManager.getAll(),
    trainer: (source, args) => trainersManager.getById(args.id),
    trainerByEmail: (source, args) => trainersManager.findOne(args),
    clients: (source, args = {}) => clientsManager.getAll(args.query),
    client: (source, args) => clientsManager.getById(args.id),
  },
  Mutation: {
    createTrainer: (source, args) => trainersManager.create(args.trainer),
    createClient: (source, args) => clientsManager.create(args.client),
    assignTrainer: async (source, args) => {
      await clientsManager.assignTrainer(args);
      return trainersManager.getById(args.trainerId);
    },
    logPayment: async (source, args) => {
      await clientsManager.logPayment({
        clientId: args.clientId,
        ...args.payment,
      });

      return clientsManager.getById(args.clientId);
    },
    logSession: async (source, args) => {
      await clientsManager.logSession({
        clientId: args.clientId,
        ...args.session,
      });

      return clientsManager.getById(args.clientId);
    },
  },
  Trainer: {
    clients: source => clientsManager.getByTrainerId(source.id),
  },
  Client: {
    trainer: source => trainersManager.getById(source.trainerId),
    payments: source => clientsManager.getPayments(source.id),
    sessions: source => clientsManager.getSessions(source.id),
  },
};
