import express from 'express';
import UsersController from '../controllers/users';
import inputValidation from '../middleware/inputValidation';

const router = express.Router();

router.post('/api/v1/users/login', inputValidation, UsersController.login);
router
  .post('/api/v1/users/register', inputValidation, UsersController.register);

export default router;

