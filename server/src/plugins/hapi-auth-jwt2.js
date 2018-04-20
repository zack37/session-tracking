import hapiAuthJWT from 'hapi-auth-jwt2';

export default {
  register: hapiAuthJWT,
  options: {
    verifyOptions: {
      issuer: 'session-tracker',
      algorithms: ['RS256'],
    },
    urlKey: false,
    cookieKey: 'false',
    tokeType: 'Bearer',
  },
};
