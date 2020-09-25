import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};

export const handleDefaultError = (error, res) => {
  console.log(error);
  return res.status(500).json({
    msg: 'Algo inesperado acontenceu.',
    error,
  });
};
