//routes are the end point of an API



import express from 'express';
import { signUpUser, loginUser } from '../controller/user-controller.js';

const Router = express.Router();

Router.post('/signup', signUpUser);
Router.post('/login', loginUser)

export default Router;
