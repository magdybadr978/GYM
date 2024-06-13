import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addMemberSchema = {
  body: joi.object().required().keys({
    name: generalFields.name.required(),
    nationalId: generalFields.id,
    phone: generalFields.phone,
    membershipFrom: joi.string(),
    membershipTo: joi.string(),
    cost: joi.number().positive().integer().required(),
    status: joi.string().required(),
    trainerId: generalFields.id,
  }),
  params: joi.object().required().keys({}),
  query: joi.object().required().keys({}),
};

export const paramsForIdSchema = {
  body: joi.object().required().keys({}),
  params: joi.object().required().keys({
    id: generalFields.id,
  }),
  query: joi.object().required().keys({}),
};

export const updateMemberSchema = {
  body: joi.object().required().keys({
    name: generalFields.name,
    membershipFrom: joi.string(),
    membershipTo: joi.string(),
    cost: joi.number().positive().integer(),
    trainerId: generalFields.idNotRequired,
  }),
  params: joi.object().required().keys({
    id: generalFields.id,
  }),
  query: joi.object().required().keys({}),
};


