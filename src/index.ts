import express from "express";
import { AddressInfo } from "net";
import dotenv from 'dotenv';
import { login } from "./controller/login";
import { signUp } from "./controller/signUp";

dotenv.config();

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
    } else {
    console.error(`Failure upon starting server.`);
    }
    });

    app.post('/signup', signUp);
    app.post('/login', login);