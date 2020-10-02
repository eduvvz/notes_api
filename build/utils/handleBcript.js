"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

 const compareHash = (stringToCompare, hash) => {
  return new Promise((resolve, reject) => {
    _bcrypt2.default.compare(stringToCompare, hash, function (err, isMatch) {
      if (err) {
        reject(err);
      }

      resolve({ isMatch });
    });
  });
}; exports.compareHash = compareHash;
