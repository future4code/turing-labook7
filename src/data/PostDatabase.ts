import { FeedDTO, POST_TYPE } from "../model/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'LabookPosts';

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

    public async getFeed(userId: string): Promise<FeedDTO> {
        const response = await this.getConnection()
        .raw(`
            SELECT photoUrl, description, createdAt, type, userId, LabookUsers.name
            FROM LabookUsers
            JOIN LabookPosts on LabookUsers.id = LabookPosts.userId
            JOIN LabookFriends on LabookPosts.userId = LabookFriends.user_friend_id
            WHERE LabookFriends.user_id = "${userId}"
            ORDER BY LabookPosts.createdAt DESC;
        `)

        return response[0]
    }
}