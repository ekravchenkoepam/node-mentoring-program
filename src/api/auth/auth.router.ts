import { Router } from 'express';
import * as authController from "./auth.controller";
import { validateUserBody } from '../../middleware';

const router = Router();

router.post('/register', validateUserBody, authController.register);
router.post('/login', validateUserBody, authController.login);

export default router;