export interface IPost{
    id: number,
    userName: string,
    photoSrc: string,
    createdAt: Date
}

export interface ILike{
    postId: number
    userName: string
}

export interface IUser{
    name: string
    avatarSrc: string
}