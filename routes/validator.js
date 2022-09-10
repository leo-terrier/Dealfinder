import { body, query, validationResult } from "express-validator";

export const validationRulesLogin = () => {
  return [body("username").isEmail(), body("password").isLength({ min: 5 })];
};

export const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    console.log("wrong inputs");
    return res.status(400).json({ errors: errors.array() });
  }
};
export const validationRulesRegister = () => {
  return [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("username").isEmail(),
    body("password").isLength({ min: 5 }),
  ];
};

export const validateRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    console.log("wrong inputs");
    return res.status(400).json({ errors: errors.array() });
  }
};

export const validationRulesSearch = () => {
  return [
    query("address").isString().notEmpty().isLength({ min: 5 }),
    query("zipcode")
      .isString()
      .notEmpty()
      .isLength({ min: 5, max: 5 })
      .isNumeric(),
  ];
};

export const validateSearch = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    console.log("wrong inputs");
    return res.status(400).json({ errors: errors.array() });
  }
};
