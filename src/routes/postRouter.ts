import express from 'express'
import { commentPost } from '../controller/commentPost'
import { createPost } from '../controller/createPost'
import { dislikePost } from '../controller/dislikePost'
import { likePost } from '../controller/likePost'

export const postRouter = express.Router()

postRouter.post("/", createPost)
postRouter.post("/like", likePost)
postRouter.post("/dislike", dislikePost)
postRouter.post("/comment", commentPost)
