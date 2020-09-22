import express from 'express'
import { addFriend } from '../controller/addFriend'
import { deleteFriend } from '../controller/deleteFriend'
import { login } from '../controller/login'
import { signUp } from '../controller/signUp'

export const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.post('/addfriend', addFriend)
userRouter.post('/deletefriend', deleteFriend)