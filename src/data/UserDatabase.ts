import { USER_ROLES } from "../services/Authenticator";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_USERS: string = 'users';

    public async createUser(id: string, name: string, email: string, password: string, role: USER_ROLES): Promise<void> {
        try{
                await this.getConnection()
                .insert({
                    id,
                    name,
                    email,
                    password,
                    role
                }).into(UserDatabase.TABLE_USERS);
            } catch(err) {
                if(err.message.includes("Data truncated for column 'role' at row 1")){
                    throw new Error("Roles precisam ser necessariamente NORMAL ou ADMIN")
                }
                throw new Error (err.sqlMessage || err.message)
            }
    };

    public async getUserByEmail(email: string): Promise<any> {
        try {
            const result = await this.getConnection()
            .select('*')
            .from(UserDatabase.TABLE_USERS)
            .where({email})
            return result[0]
        } catch(err) {
            throw new Error (err.sqlMessage || err.message)
        }
    };
}; 