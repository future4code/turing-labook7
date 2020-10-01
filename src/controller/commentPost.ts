import { EROFS } from 'constants';
import {Request, Response} from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export const commentPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string;

        const comment = req.body.comment as string;
        const postId = req.body.postId as string;

        const postBusiness = new PostBusiness()
        await postBusiness.commentPost(token, postId, comment)

        res.status(200).send({
            message: "Comentário inserido com sucesso!"
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        BaseDatabase.destroyConnection();
    }
}