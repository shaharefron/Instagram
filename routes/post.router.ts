import express from "express"
import { PostService } from "../services/post.service";
import { IPost } from "../types";
import { headerValidation } from "../middleware";

const postRouter = express.Router()

postRouter.get('/' ,(req, res, next) => {
    PostService.getAllPosts()
    .then((posts) => res.json(posts))
    .catch(next);
});

postRouter.post('/upload', headerValidation, (req, res, next) => {
    const post: IPost = req.body
    
    //@ts-ignore
    post.userName = req.user
    PostService.uploadPost(post)
    .then((message) => res.send(`post uploaded by ${message.userName} successfully`))
    .catch(next)
})

postRouter.delete('/delete', headerValidation, (req, res, next) => {
    const post: IPost = req.body
    
    //@ts-ignore
    post.userName = req.user 

    PostService.deletePost(post)
    .then(() => res.send(`post ${post.id} deleted by ${post.userName} successfully`))
    .catch(next);
})

export default postRouter;