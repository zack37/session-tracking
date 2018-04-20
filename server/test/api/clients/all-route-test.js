import initServer from '../../../src/server';
import { expect } from 'chai';

describe('clients-routes-all tests', () => {
  let server;

  before(async () => {
    server = await initServer;
  });

  after(async () => {
    return await server.stop();
  });

  it('should work', async () => {
    const { statusCode, result } = await server.inject('/session-tracker/clients');

    expect(statusCode).to.equal(200);

    expect(result).to.have.property('meta');
  });
});
