import express from 'express'
import { createPost } from '../controller/createPost'
import { likePost } from '../controller/likePost'

export const postRouter = express.Router()

postRouter.post("/", createPost)
postRouter.post("/like", likePost)