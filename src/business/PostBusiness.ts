import dayjs from "dayjs";
import { PostDatabase } from "../data/PostDatabase";
import { POST_TYPE } from "../model/Post";
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
}