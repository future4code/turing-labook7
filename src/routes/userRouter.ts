import express from 'express'
import { login } from '../controller/login'
import { signUp } from '../controller/signUp'

export const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)