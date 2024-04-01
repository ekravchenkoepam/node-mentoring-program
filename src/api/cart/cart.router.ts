import express from 'express';
import * as cartController from "./cart.controller";
import { 
    authenticateUser,
    validateRequestBody
} from "../../middleware"

const router = express.Router();

router.get('/', authenticateUser, cartController.getCart);
router.put('/', authenticateUser, validateRequestBody, cartController.updateCart);
router.delete('/', authenticateUser, cartController.removeCart);
router.post('/checkout', authenticateUser, cartController.createOrder);

export default router;
