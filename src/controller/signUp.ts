import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const signUp = async (req: Request, res: Response) => {
    try{
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const role = req.body.role;

            const userBusiness = new UserBusiness();
            const token = await userBusiness.signUp(name, email, password, role);

        res.status(200).send({
            message: 'Usuário cadastrado com sucesso!',
            token
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    } finally {
        await BaseDatabase.destroyConnection()
    }
}