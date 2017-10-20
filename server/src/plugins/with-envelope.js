import boom from 'boom';
import joi from 'joi';

const optionsSchema = joi
  .object({
    withPaging: joi.bool(),
    count: joi
      .number()
      .integer()
      .min(0),
  })
  .with('withPaging', 'count');

function getNextLink(queryParams, href, count) {
  const { page, limit } = queryParams;

  return page * limit < count && `${href}?page=${page + 1}&limit=${limit}`;
}

function getPrevLink(queryParams, href) {
  const { page, limit } = queryParams;

  return page > 1 && `${href}?page=${page - 1}&limit=${limit}`;
}

const plugin = {
  register: (server, options, next) => {
    server.decorate('reply', 'withEnvelope', async function withEnvelope(
      response = {},
      options = {}
    ) {
      response = response || {};
      if (response.isBoom || response instanceof Error) {
        return this.response(response);
      }

      try {
        joi.assert(
          options,
          optionsSchema,
          'Invalid options supplied to `withEnvelope`'
        );

        const { query, url } = this.request;

        const envelope = {
          meta: {
            self: url.path,
          },
          data: await response,
        };

        if (options.withPaging && options.count) {
          const next = getNextLink(query, url.pathname, options.count);
          const prev = getPrevLink(query, url.pathname);

          envelope.meta = {
            ...envelope.meta,
            ...(next ? { next } : {}),
            ...(prev ? { prev } : {}),
            total: options.count,
          };
        }

        this.response(envelope);
      } catch (e) {
        return this.response(boom.wrap(e));
      }
    });

    next();
  },
};

plugin.register.attributes = {
  name: 'with-envelope',
};

export default plugin;
