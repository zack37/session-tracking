import joi from 'joi';

export default joi.string().regex(/[A-Za-z0-9_-]{7,14}/);
