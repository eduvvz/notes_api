import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: 'Nenhum token fornecido.' });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

export default verifyJWT;
