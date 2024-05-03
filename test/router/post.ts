import { Router,Request,Response, query } from "express";
import pg from 'pg';
import formidable from "formidable";

//import router,req & res from express then 
export const postRouter = Router();

postRouter.get("/getPost", getPost);
postRouter.post("/postPost", postPost);
postRouter.put("/putPost", putPost);
postRouter.delete("/deletePost", deletePost);

async function getPost(req:Request,res:Response) {
}
async function postPost(req:Request,res:Response) {
    const form = formidable({
        uploadDir: __dirname + "/../uploads",
        keepExtensions: true,
        minFileSize: 0,
        allowEmptyFiles: false,
      });

}
async function putPost(req:Request,res:Response) {
}
async function deletePost(req:Request,res:Response) {
}