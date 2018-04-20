import joi from 'joi';

export const mutableFields = joi.object().keys({
  email: joi.string().email(),
  password: joi.string(),
});

export const mutableFieldsStrict = mutableFields.requiredKeys(
  'email',
  'password',
);
