import {Router} from 'express';
import {getUsers, getOneUser, createUser, updateUser, deleteUser} from '../controllers/userController.js';
import {nameValidator, validating, checkUser} from '../middlewares/userValidation.js';

export const userRouter = Router();

userRouter
    .route('/')
    .get(getUsers)
    .post(nameValidator(), validating, createUser);

userRouter
    .route('/:id')
    .get(checkUser(), getOneUser)
    .put(nameValidator(), updateUser)
    .delete(deleteUser)