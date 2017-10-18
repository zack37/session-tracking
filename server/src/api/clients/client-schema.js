import idSchema from '../../schemas/id-schema';
import joi from 'joi';

const planSchema = joi.object({
  name: joi.string(),
  price: joi
    .number()
    .min(0)
    .precision(2),
});

export const mutableFields = joi.object().keys({
  name: joi.string(),
  plans: joi.array().items(planSchema),
});

export const mutableFieldsStrict = mutableFields.requiredKeys('name', 'plans');

export const response = mutableFieldsStrict.keys({
  _id: idSchema.required(),
});
