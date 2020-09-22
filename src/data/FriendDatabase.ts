import { BaseDatabase } from "./BaseDatabase";

export class FriendDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'LabookFriends';

    public async addFriend(user_id: string, user_friend_id: string): Promise<void> {
        try {
            await this.getConnection()
            .insert({
                user_id,
                user_friend_id,
            })
            .into(FriendDatabase.TABLE_NAME)

            await this.getConnection()
            .insert({
                user_id: user_friend_id,
                user_friend_id: user_id,
            })
            .into(FriendDatabase.TABLE_NAME)
        } catch (error) {
            if(error.message.includes("Duplicate entry")){
                throw new Error("Vocês já são amigos!")
            }
            throw new Error (error.sqlMessage || error.message)
        }
    }

    public async deleteFriend(user_id: string, user_friend_id: string): Promise<void> {
        try {
            await this.getConnection()
            .delete("*")
            .from(FriendDatabase.TABLE_NAME)
            .where({
                user_id,
                user_friend_id
            })

            await this.getConnection()
            .delete("*")
            .from(FriendDatabase.TABLE_NAME)
            .where({
                user_id: user_friend_id,
                user_friend_id: user_id
            })
        } catch (error) {
            throw new Error (error.sqlMessage || error.message)
        }
    }
}