import dayjs from "dayjs";
import { PostDatabase } from "../data/PostDatabase";
import { PostDTO, POST_TYPE } from "../model/Post";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PostBusiness {
    public async createPost(token: string, photoUrl: string, description: string, type: POST_TYPE): Promise<void> {
        const idGenerator = new IdGenerator()
        const postId = idGenerator.generate()

        const authenticator = new Authenticator()
        const user = authenticator.getData(token)

        const createdAt = dayjs().format("YYYY-MM-DD")

        if(!description || !photoUrl || !type) {
            throw new Error("Preencha todos os campos")
        }

        const postDatabase = new PostDatabase()
        await postDatabase.createPost(postId, photoUrl, description, createdAt, type, user.id)
    }

    public async getFeed(token: string): Promise<PostDTO[]> {
        const authenticator = new Authenticator
        const user = authenticator.getData(token)

        // if(!type) {
        //     type = "NORMAL"
        // }

        const postDatabase = new PostDatabase()
        const feed = await postDatabase.getFeed(user.id)

        return feed
    }
}