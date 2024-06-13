import joi from "joi";
const dataMethods = ["body", "params", "query", "headers", "file", "files"];


export const generalFields = {
  id: joi.string().required(),
  idNotRequired: joi.string(),
  name: joi
    .string()
    .min(2)
    .max(20)
    .label("name must be between 2 or 20 characters"),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
  phone: joi
    .string()
    .pattern(new RegExp(/^(01)(0|1|2|5)[0-9]{8}$/))
    .required()
    .label("enter valid number please"),
  password: joi
    .string()
    //.pattern( new RegExp( /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/ ) ),
    .pattern(
      new RegExp(/^[a-zA-Z\u0600-\u06FF0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\|/-]*$/)
    )
    .label("password must be greater than 8 chars and contain nums and chars"),
  code: joi
    .string()
    .pattern(new RegExp(/^[0-9]{5}$/))
    .required()
    .label("enter fall code please"),
};

export const isValid = (schema) => {
  return (req, res, next) => {
    const validationErr = [];
    dataMethods.forEach((key) => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });

        if (validationResult.error) {
          if (validationResult.error.details) {
            validationResult.error.details.map((detail) => {
              const dictionary = {};
              if (detail.context.label.includes(detail.path[0])) {
                dictionary[`${detail.path[0]}`] = `${detail.message}`;
              } else {
                dictionary[`${detail.path[0]}`] = `${detail.context.label}`;
              }
              validationErr.push(dictionary);
            });
          }
        }
      }
    });

    if (validationErr.length) {
      return res.status(400).json({ success: false, message: validationErr });
    }
    return next();
  };
};