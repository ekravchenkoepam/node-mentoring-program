import express from 'express';
import * as cartController from "./cart.controller";
import { 
    authenticateUser,
    validateRequestBody
} from "../../middleware"

const router = express.Router();

router.get('/', authenticateUser, cartController.getOrCreateCart);
router.put('/', authenticateUser, validateRequestBody, cartController.updateCart);
router.delete('/', authenticateUser, cartController.removeCart);

export default router;
