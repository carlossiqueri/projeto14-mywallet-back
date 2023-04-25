import joi from "joi";

export const transactionsSchema = joi.object({
  value: joi.string().required(),
  description: joi.string().required(),
});
