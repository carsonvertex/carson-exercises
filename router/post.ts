import { Router,Request,Response, query } from "express";
import pg from 'pg';
import formidable from "formidable";
import { pgClient } from "../pgclient";

//import router,req & res from express then 
export const postRouter = Router();

postRouter.get("/getPost", getPost);
postRouter.post("/postPost", postPost);
postRouter.put("/putPost", putPost);
postRouter.delete("/deletePost", deletePost);

async function getPost(req:Request,res:Response) {
  let getPostQueryResult = await (pgClient.query("SELECT * FROM posts"));
  res.send(getPostQueryResult)
}


async function postPost(req:Request,res:Response) {
    const form = formidable({
        uploadDir: __dirname + "/../uploads",
        keepExtensions: true,
        minFileSize: 0,
        allowEmptyFiles: false,
      });
      let title:string;
      let content:string;
      let image:string;

      form.parse(req,async(err,fields,files)=>{
        if(err){
          res.status(500).json({ message: "Internal Server Error" });
        }
        if(fields.title){
          title = fields.title[0];
        }
        if(fields.content){
          content = fields.content[0];
        }
        if(files.image){
          image = files.image[0].newFilename;
        }

        let textQueryResults = await pgClient.query('INSERT INTO posts (title,content) VALUES ($1,$2) RETURNING id',[title,content])
        const imagesId = textQueryResults.rows[0].id
        let imageQueryResults = await pgClient.query('INSERT INTO images (imagesId,image) VALUES ($1,$2) RETURNING id',[imagesId,image])

        res.json({
          data:{
            photo:imageQueryResults
          }
        })
      })

      

}
async function putPost(req:Request,res:Response) {
}
async function deletePost(req:Request,res:Response) {
}