import { Router } from 'express';
import {createComment, deleteComment, getAllComments, updateComment} from "../controllers/comments";
import {jwtAuthentication} from "../middleware/jwtAuthentication";

const commentsRouter: Router = Router();

commentsRouter.post('/posts/:postId/comments', jwtAuthentication, createComment)
commentsRouter.get('/posts/:postId/comments', getAllComments)
commentsRouter.put('/comments/:id', jwtAuthentication, updateComment)
commentsRouter.delete('/comments/:id', jwtAuthentication, deleteComment)

export default commentsRouter;