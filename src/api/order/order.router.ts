import express from 'express';
import * as orderController from './order.controller'
import { 
    authenticateUser,
} from "../../middleware"

const router = express.Router();

router.post('/', authenticateUser, orderController.createOrder);

export default router;
