import bcrypt from 'bcrypt';

export const toHash = (toHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(toHash, salt, (err, passwordHash) => {
        if (err) {
          reject(err);
        }
        resolve(passwordHash);
      });
    });
  });
};
