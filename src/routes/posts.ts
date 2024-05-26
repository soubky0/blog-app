import { Router } from 'express';
import {getAllPosts, createPost, getPost, updatePost, deletePost} from "../controllers/posts";
import {jwtAuthentication} from "../middleware/jwtAuthentication";
import {invalidatePostsCache} from "../middleware/redis"

const postsRouter: Router = Router();

postsRouter.post('/', jwtAuthentication,invalidatePostsCache, createPost)
postsRouter.get('/', getAllPosts)
postsRouter.get('/:id', getPost)
postsRouter.put('/:id', jwtAuthentication, invalidatePostsCache, updatePost);
postsRouter.delete('/:id', jwtAuthentication, invalidatePostsCache, deletePost);

export default postsRouter;