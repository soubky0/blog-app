import { Router } from 'express';
import {getAllPosts, createPost, getPost, updatePost, deletePost} from "../controllers/posts";
import {jwtAuthentication} from "../middleware/jwtAuthentication";

const postsRouter: Router = Router();

postsRouter.post('/', jwtAuthentication, createPost)
postsRouter.get('/', getAllPosts)
postsRouter.get('/:id', getPost)
postsRouter.put('/:id', jwtAuthentication, updatePost)
postsRouter.delete('/:id', jwtAuthentication, deletePost)

export default postsRouter;