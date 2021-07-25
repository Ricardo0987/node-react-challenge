import { Router } from 'express';
import * as usersController from '../../controllers/v1/users-controller';

const router = Router();

router.post('/create', usersController.createUser);
router.post('/login', usersController.login);

export default router;
