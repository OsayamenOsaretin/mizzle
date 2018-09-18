import { fieldValidationFnMap, inValidFieldMessage } from
  '../utility/validationHelper';


const fieldMap = {
  '/api/v1/users/login': ['password', 'username'],
  '/api/v1/users/register': ['email', 'password', 'username']
};

/**
 * middleware for validation
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
export default function (req, res, next) {
  const { path } = req;
  const invalidField = fieldMap[path]
    .find((field) => {
      if (req.body[field]) {
        const validationFn = fieldValidationFnMap[field];
        return !validationFn.every(fn => fn(req.body[field]));
      } else if (path === '/api/v1/users/login') {
        const { username, email } = req.body;
        return (username && email);
      }
      return true;
    });

  if (invalidField) {
    return res.status(400).send({
      error: inValidFieldMessage[invalidField]
    });
  }
  next();
}
