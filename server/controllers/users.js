import bcrypt from 'bcryptjs';
import models from '../models';
import generateToken from '../utility/generateToken';

const salt = bcrypt.genSaltSync(7);

const users = {
  register: (req, res) => {
    models.User.findOne({
      where: {
        $or: [
          { email: req.body.email },
          { username: req.body.username },
        ],
      },
    })
      .then((existingUser) => {
        if (existingUser) {
          const errorMessage = existingUser.email === req.body.email ?
            'Email already exists, try another' : 'Username exists already';
          res.status(409).send({
            error: errorMessage,
          });
        } else {
          const {
            username, email, password,
            usertype, avatar, twitter, facebook, instagram,
          } = req.body;
          const userData = {
            username,
            email,
            password: bcrypt.hashSync(password, salt),
            usertype,
            avatar,
            twitter,
            facebook,
            instagram,
          };
          models.User.create(userData)
            .then((user) => {
              const token = generateToken(user);
              res.status(201).send({
                message: 'Successful registeration',
                token,
              });
            }).catch((error) => {
              res.status(500).send({
                error: error.message,
              });
            });
        }
      }).catch((error) => {
        res.status(500).send({
          error: error.message,
        });
      });
  },
  login: (req, res) => {
    const { email, password, username } = req.body;
    models.User.findOne({
      where: {
        $or: [
          { email },
          { username },
        ],
      },
    })
      .then((existingUser) => {
        if (existingUser) {
          const truePassword =
            bcrypt.compareSync(password, existingUser.password);
          if (truePassword) {
            const token = generateToken(existingUser);
            res.status(200).send({
              token,
            });
          } else {
            res.status(401).send({
              error: 'Incorrect Username or password',
              message: 'incorrect password',
            });
          }
        } else {
          res.status(401).send({
            error: 'Incorrect Username or password',
            message: 'no user',
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          error: error.message,
        });
      });
  },
};

export default users;

