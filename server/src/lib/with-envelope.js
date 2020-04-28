// Deprecated
// import boom from 'boom';
// import joi from 'joi';

// const optionsSchema = joi
//   .object({
//     withPaging: joi.bool(),
//     count: joi
//       .number()
//       .integer()
//       .min(0),
//     code: joi
//       .number()
//       .integer()
//       .min(100)
//       .max(599)
//       .default(200),
//   })
//   .with('withPaging', 'count');

// function getNextLink(queryParams, href, count) {
//   const { page, limit } = queryParams;

//   return page * limit < count && `${href}?page=${page + 1}&limit=${limit}`;
// }

// function getPrevLink(queryParams, href) {
//   const { page, limit } = queryParams;

//   return page > 1 && `${href}?page=${page - 1}&limit=${limit}`;
// }

// export const plugin = {
//   name: 'with-envelope',
//   register: server => {
//     server.decorate('toolkit', 'withEnvelope', async function withEnvelope(
//       response = {},
//       options = {},
//     ) {
//       response = response || {};
//       if (response.isBoom || response instanceof Error) {
//         return this.response(response);
//       }
//       try {
//         const parsedOptions = joi.attempt(
//           options,
//           optionsSchema,
//           'Invalid options supplied to `withEnvelope`',
//         );
//         const { query, url } = this.request;
//         const envelope = {
//           meta: {
//             self: url.path,
//           },
//           data: await response,
//         };
//         if (parsedOptions.withPaging && parsedOptions.count) {
//           const next = getNextLink(query, url.pathname, options.count);
//           const prev = getPrevLink(query, url.pathname);
//           envelope.meta = {
//             ...envelope.meta,
//             ...(next ? { next } : {}),
//             ...(prev ? { prev } : {}),
//             total: parsedOptions.count,
//           };
//         }
//         this.response(envelope).code(parsedOptions.code);
//       } catch (e) {
//         return this.response(boom.wrap(e));
//       }
//     });
//   },
// };
