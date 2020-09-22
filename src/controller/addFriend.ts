import {Request, Response} from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseDatabase } from '../data/BaseDatabase'

export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string
        const friendId = req.body.friendId as string

        const userBusiness = new UserBusiness()
        const friend = await userBusiness.addFriend(token, friendId)

        res.status(200).send({
            message: `Agora você e ${friend.name} são amigos!`
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        BaseDatabase.destroyConnection()
    }
}

