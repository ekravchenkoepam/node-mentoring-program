import express from 'express';
import * as cartController from "./cart.controller";
import { 
    authenticateUser,
    authorizeAdmin,
    validateRequestBody
} from "../../middleware"

const router = express.Router();

router.get('/', authenticateUser, cartController.getOrCreateCart);
router.put('/', authenticateUser, validateRequestBody, cartController.updateCart);
router.delete('/', authenticateUser, authorizeAdmin, cartController.removeCart);

export default router;
