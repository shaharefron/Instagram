import prisma from "../prisma/client";
import { ILike, IPost } from "../types";
import { PostService } from "./post.service";
import { UserService } from "./user.service";

export class LikeService {
  static likePost = async (postToLike: ILike) => {
    this.validatePostAndUser(postToLike)

    try{
      const data = await prisma.like.create({
        data:{
          postId: postToLike.postId,
          userName: postToLike.userName
        }
      })

      return data
    }
    catch{
      throw new Error("Error liking post")
    }
  }

  static unlikePost = async (postToUnlike: ILike) => {
    this.validatePostAndUser(postToUnlike)

    try{
      await prisma.like.delete({
        where: {
          postId_userName: {
            postId: postToUnlike.postId,
            userName: postToUnlike.userName
          }
        }
      })
    }
    catch{
      throw new Error("Error unliking post")
    }
  }

  static validatePostAndUser = async (dataToValidate: ILike) => {
    if(!(dataToValidate.postId && dataToValidate.userName)) {
      throw new Error("Bad request")
    }

    if(!await UserService.doesUserExist(dataToValidate.userName)){
      throw new Error("User does not exists")
    }

    if(!await PostService.doesPostExist(dataToValidate.postId)){
      throw new Error("Post does not exists")
    }
  }
}
