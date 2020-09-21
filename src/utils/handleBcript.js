import bcrypt from 'bcrypt';

export const compareHash = (stringToCompare, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(stringToCompare, hash, function (err, isMatch) {
      if (err) {
        reject(err);
      }

      resolve({ isMatch });
    });
  });
};
