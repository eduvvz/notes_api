"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: 'Nenhum token fornecido.' });

  _jsonwebtoken2.default.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

exports. default = verifyJWT;
