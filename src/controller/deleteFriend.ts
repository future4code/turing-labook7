import {Request, Response} from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseDatabase } from '../data/BaseDatabase'

export const deleteFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string
        const friendId = req.body.friendId as string

        const userBusiness = new UserBusiness()
        const friend = await userBusiness.deleteFriend(token, friendId)

        res.status(200).send({
            message: `Você cortou relações com ${friend.name}! 😭`
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        BaseDatabase.destroyConnection()
    }
}