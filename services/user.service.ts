import prisma from "../prisma/client";
import { IUser } from "../types";

export class UserService {
  static getAllUsers = () => {
    try{
      return prisma.user.findMany()
    }
    catch{
      throw new Error("Unexpected error")
    }
  } 

  static getUsers = (searchValue: string) => {
    try{
      return prisma.user.findMany({
      where: {
        name: { contains: searchValue }
        }
      })
    }
    catch{
      throw new Error("Unexpected error")
    }
  }
  
  static createUser = async (user: IUser) => {
    if(!(user.name && user.avatarSrc)){
      throw new Error("Bad request")
    }

    if(!!this.doesUserExist(user.name)){
      throw new Error("User exists")
    }

    try{
      const data = await prisma.user.create({
        data: {
          name: user.name,
          avatarSrc: user.avatarSrc
        },
      })

      return data
    }
    catch{
      throw new Error("Unexpected error")
    }
  } 

  static deleteUser = async (name: string) => {
    if(name){
      throw new Error("Bad request")
    }

    if(!this.doesUserExist(name)){
      throw new Error("User does not exist")
    }

    try{
      await prisma.user.delete({
        where: {
          name: name,
        },
      })
    }
    catch{
      throw new Error("Unexpected error")
    }
  }

  static doesUserExist = async (name: string) => {
    try{
      const user = await prisma.user.findUnique({
        where: {
          name: name
        }
      })
  
      return !!user
    }
    catch{
      throw new Error("Unexpected error")
    }
  }

  static getPostsByUser = (name: string) => {
    if(!name){
      throw new Error("Bad request")
    }

    try{
      return prisma.user.findMany({
        where: {
          name: name
        },
        include:{
          posts: true
        } // likes
      })
    }
    catch{
      throw new Error("Unexpected error")
    }    
  }
}