import express from 'express';
import * as userController from "./user.controller";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:userId', userController.deleteUserById);
router.get('/:userId/hobbies', userController.getUserHobbies);
router.patch('/:userId/hobbies', userController.updateUserHobby);

export default router;
