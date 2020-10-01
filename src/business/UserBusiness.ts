import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import {USER_ROLES} from "../services/Authenticator";
import { FriendDatabase } from "../data/FriendDatabase";
import { User } from "../model/User";

export class UserBusiness {

    public async signUp(name: string, email: string, password: string, role: USER_ROLES): Promise<string> {

        if (!name || !email || !password) {
            throw new Error('Insira todas as informações necessárias para o cadastro')
        }
        
        if (email.indexOf('@') === -1) {
            throw new Error('E-mail inválido')
        }
        
        if (password.length < 6) {
            throw new Error("Senha inválida");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const cypherPassword = await hashManager.hash(password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id,
            name,
            email,
            cypherPassword,
            role
        );

        const auth = new Authenticator();
        const token = auth.generateToken({id, role: USER_ROLES.ADMIN });

        return token;
    }

    public async login(email: string, password: string): Promise<string> {

        if (!email || !password || email.indexOf("@") === -1) {
            throw new Error('Insira todas as informações necessárias para o login')
        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserByEmail(email);

        const passwordIsCorrect: boolean = await new HashManager().compare(
            password,
            user.password
        );

        if (!passwordIsCorrect) {
            throw new Error('Usuário ou senha inválidos')
        }

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({id: user.id, role: USER_ROLES.ADMIN });

        return token;
    }

    public async addFriend(token: string, user_friend_id: string): Promise<User> {
        try {

            const authenticator = new Authenticator()
            const tokenInfo = authenticator.getData(token)
            if (!tokenInfo.id || !user_friend_id){
                throw new Error("Informe todas as informações.")
            }

            const userDatabase = new UserDatabase()
            const user = userDatabase.getUserById(user_friend_id)

            const friendDatabase = new FriendDatabase()
            await friendDatabase.addFriend(tokenInfo.id, user_friend_id)

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async deleteFriend(token: string, user_friend_id: string): Promise<User> {
        try {
            const authenticator = new Authenticator()
            const tokenInfo = authenticator.getData(token)
            if (!tokenInfo.id || !user_friend_id){
                throw new Error("Informe todas as informações.")
            }

            const userDatabase = new UserDatabase()
            const user = userDatabase.getUserById(user_friend_id)

            const friendDatabase = new FriendDatabase()
            await friendDatabase.deleteFriend(tokenInfo.id, user_friend_id)

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

}