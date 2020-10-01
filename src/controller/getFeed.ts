import dayjs from 'dayjs'
import {Request, Response} from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { PostDTO } from '../model/Post'

export const getFeed = async (req: Request, res: Response) : Promise<void> => {
    try {
        const token = req.headers.authorization as string
        const type = req.query.type as string
        const pageNumber = Number(req.query.page) || 1

        const postBusiness = new PostBusiness()
        const feed = await postBusiness.getFeed(token, type, pageNumber)

        res.status(200).send({
            posts: feed.map((post: PostDTO) => {
                return {
                    photoUrl: post.photoUrl,
                    description: post.description,
                    createdAt: dayjs(post.createdAt).format("DD/MM/YYYY"),
                    type: post.type,
                    userId: post.userId,
                    name: post.name
                }
            })
    })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        BaseDatabase.destroyConnection()
    }
}