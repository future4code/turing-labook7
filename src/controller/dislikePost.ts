import {Request, Response} from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export const dislikePost = async(req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string;
        const postId = req.body.postId as string;
        
        const postBusiness = new PostBusiness();
        await postBusiness.dislikePost(token, postId)

        res.status(200).send({
            message: "Você descurtiu este post!"
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        BaseDatabase.destroyConnection();
    }
}