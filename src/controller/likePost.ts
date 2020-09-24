import {Request, Response} from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export const likePost = async(req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string;
        const postId = req.body.postId as string;
        
        const postBusiness = new PostBusiness();
        await postBusiness.likePost(token, postId)

        res.status(200).send({
            message: "Post curtido com sucesso!"
        })
    } catch (error) {
        if (error.message.includes("ER_DUP_ENTRY: Duplicate entry")) {
            res.status(400).send({
                message: "Você já curtiu esse post!"
            })
        }
        res.status(400).send({
            message: error.message
        })
    } finally {
        BaseDatabase.destroyConnection();
    }
}