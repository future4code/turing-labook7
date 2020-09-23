import express from "express";
import { AddressInfo } from "net";
import dotenv from 'dotenv';
import { userRouter } from "./routes/userRouter";
import { postRouter } from "./routes/postRouter";
import { getFeed } from "./controller/getFeed";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/user', userRouter)
app.use('/post', postRouter)
app.get('/feed', getFeed)

const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
    } else {
    console.error(`Failure upon starting server.`);
    }
    });
