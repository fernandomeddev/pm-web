import { Router } from 'express';
import { userRegisterController } from '../../../controllers/user/userRegisterController';
import { userSigninController } from '../../../controllers/user/userSigninController';

const router = Router()

router.post('/register', userRegisterController);
router.post('/login', userSigninController);

export default router