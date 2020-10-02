"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _expressvalidator = require('express-validator');

 const handleValidationErrors = (req, res, next) => {
  const errors = _expressvalidator.validationResult.call(void 0, req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
}; exports.handleValidationErrors = handleValidationErrors;

 const handleDefaultError = (error, res) => {
  console.log(error);
  return res.status(500).json({
    msg: 'Algo inesperado acontenceu.',
    error,
  });
}; exports.handleDefaultError = handleDefaultError;
