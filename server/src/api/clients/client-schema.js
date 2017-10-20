import idSchema from '../../schemas/id-schema';
import joi from 'joi';

export const mutableFields = joi.object().keys({
  name: joi.string(),
  balance: joi
    .number()
    .precision(2)
    .default(0),
});

export const mutableFieldsStrict = mutableFields.requiredKeys(
  'name',
  'balance'
);

export const response = mutableFieldsStrict.keys({
  _id: idSchema.required(),
});
