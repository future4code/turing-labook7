import { PostDTO, POST_TYPE } from "../model/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'LabookPosts';
    private static TABLE_LIKE: string = 'likeDeslikePost';

    public async createPost(postId: string, photoUrl: string, description: string, createdAt: string, type: POST_TYPE, userId: string) {
        await this.getConnection()
        .insert({
            postId, 
            photoUrl,
            description,
            createdAt,
            type,
            userId
        })
        .into(PostDatabase.TABLE_NAME)
    }

    public async getFeed(userId: string, type: string, pageNumber: number): Promise<PostDTO[]> {
        let filteredType = ""
        if(type === "NORMAL" || type === "EVENTO") {
            filteredType =  `AND LabookPosts.type = "${type}"`
        } else {
            filteredType = ""
        }

        const offset: number = 5 * (pageNumber - 1)

        const response = await this.getConnection()
        .raw(`
            SELECT photoUrl, description, createdAt, type, userId, LabookUsers.name
            FROM LabookUsers
            JOIN LabookPosts on LabookUsers.id = LabookPosts.userId
            JOIN LabookFriends on LabookPosts.userId = LabookFriends.user_friend_id
            WHERE LabookFriends.user_id = "${userId}" ${filteredType}
            ORDER BY LabookPosts.createdAt DESC
            LIMIT 5
            OFFSET ${offset};
        `)

        if(!response[0].length) {
            throw new Error("Página não encontrada!")
        }

        return response[0]
    }

    public async likePost (userId: string, postId: string): Promise<void> {
        await this.getConnection()
        .insert({
            postId,
            userId
        }).into(PostDatabase.TABLE_LIKE)
    }
}