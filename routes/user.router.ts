import express from "express"
import { UserService } from "../services/user.service";
import { IUser } from "../types";
import { headerValidation } from "../middleware";

const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
    UserService.getAllUsers()
    .then((users) => res.json(users))
    .catch(next);
});

userRouter.get('/search/:user?', (req, res, next) => {
    const user: string | undefined = req.params.user

    user ? UserService.getUsers(user)
    .then((users) => res.json(users))
    .catch(next) :
    UserService.getAllUsers()
    .then((users) => res.json(users))
    .catch(next);
    
})

userRouter.get('/posts', headerValidation, (req, res, next) => {
    //@ts-ignore
    UserService.getPostsByUser(req.user)
    .then((posts) => res.json(posts))
    .catch(next);    
})

userRouter.post('/newUser',  (req, res, next) => {
    const user: IUser = req.body
    UserService.createUser(req.body)
    .then((user) => res.send(`user '${user.name}' created successfully`))
    .catch(next);
})

export default userRouter