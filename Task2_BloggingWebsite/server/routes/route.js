//routes are the end point of an API



import express from 'express';

import { signUpUser, loginUser } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment, getComments,deleteComment } from '../controller/comment-controller.js';

import upload from '../utils/upload.js';

const Router = express.Router();

Router.post('/signup', signUpUser);
Router.post('/login', loginUser);
// middleware: It's working is, if we want to do something before actual API implementation. Then we do that work in the middleware(here it's upload.sigle('file') )  
Router.post('/file/upload', upload.single('file'), uploadImage);
Router.get('/file/:filename',getImage);

Router.post('/create',authenticateToken, createPost);
Router.get('/posts', authenticateToken, getAllPosts);
Router.get('/post/:id', authenticateToken, getPost);
Router.put('/update/:id', authenticateToken, updatePost);
Router.delete('/delete/:id', authenticateToken, deletePost);
Router.post('/comment/new', authenticateToken, newComment);
Router.get('/comments/:id', authenticateToken, getComments);
Router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default Router;
