import { ApolloServer } from 'apollo-server';
import { registerServer } from 'apollo-server-hapi';
import { Server } from 'hapi';
import registerPlugins from './plugins';
import * as schema from './api/graphql';

const apolloServer = new ApolloServer(schema);
const webServer = new Server({
  autoListen: false,
  router: {
    stripTrailingSlash: true,
  },
});

async function bootstrap() {
  try {
    await registerPlugins(webServer);

    await registerServer({ server: apolloServer, app: webServer });
    const { url } = await apolloServer.listen({
      http: { port: process.env.PORT || 3000 },
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
