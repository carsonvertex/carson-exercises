import express, { Router } from 'express';
import expressSession from 'express-session';
import dotenv from 'dotenv';
import { postRouter } from './router/post';

const app = express()
const PORT = 8080;

//config dotenv 一定要加 if。。。。。
dotenv.config()

if (!process.env.SECRET)
    throw Error("No Secret in .env");

//express session 先declare再app.use

declare module "express-session" {
    interface SessionData {
        userId: number;
        username: string;
    }
}

app.use(
    expressSession({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: true,
    })
);

//api
app.use("/post",postRouter)

//static
app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})