import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addTrainerSchema = {
  body : joi.object().required().keys({
    name : generalFields.name.required(),
    durationFrom : joi.string().required(),
    durationTo : joi.string().required()
  }),
  params : joi.object().required().keys({}),
  query : joi.object().required().keys({}),
}


export const paramsSchema = {
  params : joi.object().required().keys({
    id : generalFields.id
  })
}


export const updateTrainerSchema = {
  body : joi.object().required().keys({
    name : generalFields.name,
    durationFrom : joi.string(),
    durationTo : joi.string()
  }),
  params : joi.object().required().keys({
    id : generalFields.id
  })
}


