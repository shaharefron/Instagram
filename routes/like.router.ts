import express from "express"
import { LikeService } from "../services/like.service";
import { ILike } from "../types";
import { headerValidation } from "../middleware";

const likeRouter = express.Router()

likeRouter.post('/like', headerValidation, (req, res, next) => {
    const postToLike: ILike = req.body

    //@ts-ignore
    postToLike.userName = req.user

    LikeService.likePost(postToLike)
        .then((message) => 
            res.send(`post ${message.postId} liked by ${message.userName} successfully`))
        .catch(next);
})

likeRouter.delete('/unlike', headerValidation, (req, res, next) => {
    const postToUnlike: ILike = req.body

    //@ts-ignore
    postToUnlike.userName = req.user

    LikeService.unlikePost(postToUnlike)
    .then(() => res.send(`post ${postToUnlike.postId} unliked by ${postToUnlike.userName} successfully`))
    .catch(next);
})

export default likeRouter;