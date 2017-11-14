import joiBase from 'joi';
import joiDate from 'joi-date-extensions';

const joi = joiBase.extend(joiDate);

export const mutableFields = joi.object({
  date: joi.date().format('YYYY-MM-DD'),
  amount: joi.number().min(0).precision(2)
});

export const mutableFieldsStrict = mutableFields.requiredKeys('date', 'amount');
