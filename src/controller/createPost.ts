import {Request, Response} from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { POST_TYPE } from '../model/Post'

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string
        const postData = {
            photoUrl: req.body.photoUrl as string,
            description: req.body.description as string,
            type: req.body.type as POST_TYPE
        }

        const postBusiness = new PostBusiness()
        await postBusiness.createPost(token, postData.photoUrl, postData.description, postData.type)

        res.status(200).send({
            message: "Post criado com sucesso!"
        })
    } catch (error) {
        if(error.message.includes("Data truncated for column 'type' at row 1")){
            res.status(400).send({message: "O type pode ser somente NORMAL ou EVENTO!"})
        }
        res.status(400).send({
            message: error.message
        })
    } finally{
        BaseDatabase.destroyConnection()
    }
}