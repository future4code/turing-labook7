import express from 'express'
import { createPost } from '../controller/createPost'

export const postRouter = express.Router()

postRouter.post("/", createPost)