import joi from 'joi';

const metaSchema = joi.object({
  self: joi.string().required(),
  next: joi.string(),
  prev: joi.string(),
  total: joi
    .number()
    .min(0)
    .integer(),
});

export default dataSchema =>
  joi.object({
    meta: metaSchema,
    data: dataSchema,
  });
