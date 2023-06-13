import prisma from "../prisma/client";
import { IPost } from "../types";
import { UserService } from "./user.service";

export class PostService {
  static getAllPosts = () => {
    try{
      return prisma.post.findMany({
        include: {
          likes: true
        }
      })
    }
    catch{
      throw new Error("Unexpected error")
    }
  } 

  static uploadPost = async (post: IPost) => {
    if(!(post.userName && post.photoSrc && post.createdAt)){
      throw new Error("Bad request")
    }

    if(!await UserService.doesUserExist(post.userName)){
      throw new Error("User does not exists")
    }
    
    try{
      const data = await prisma.post.create({
        data: {
          userName: post.userName,
          photoSrc: post.photoSrc,
          createdAt: post.createdAt
        },
      })

      return data
    }
    catch{
      throw new Error("Unexpected error")
    }
  }

  static isUserOwnPost = async (user: string, postId: number) => {
    if(!UserService.doesUserExist(user)){
      throw new Error("User does not exist")
    }

    try{
      const post = await prisma.post.findUnique({
        where: {
          id: postId
        }
      })
  
      return post?.userName === user
    }
    catch{
      throw new Error("Unexpected error")
    }
  }

  static deletePost = async (postToDelete: IPost) => {
    if(!postToDelete.id){
      throw new Error("Bad request")
    }
    
    const post: IPost | null = await PostService.getPost(postToDelete.id)

    if(!(post && post.userName === postToDelete.userName)){
      throw new Error("Error deleting post")
    }

    try{
      await prisma.post.delete({
        where: {
          id: postToDelete.id,
        }
      })
    }
    catch{
      throw new Error("Unexpected error")
    }
  }

  static doesPostExist = async (id: number) => {
    try{
      const post = await prisma.post.findUnique({
        where: {
          id: id
        }
      })
  
      return !!post
    }
    catch{
      throw new Error("Unexpected error")
    }
  }

  static getPost = async (id: number) => {
    try{
      const post = await prisma.post.findUnique({
        where: {
          id: id
        }
      })
  
      return post
    }
    catch{
      throw new Error("Unexpected error")
    }
  }

}
