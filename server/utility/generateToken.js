import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'secret';

/**
 * @param {Object} user data to be tokenized
 *
 * @returns {String} token jwt token
 */
export default function generateToken(user) {
  const token = jwt.sign({
    data: user
  }, secret, { expiresIn: '48h' });

  return token;
}

