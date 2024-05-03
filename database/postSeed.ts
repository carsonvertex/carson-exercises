import { Client } from "pg";
import dotenv from "dotenv"
dotenv.config()

let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

type posts = {
    title: string,
    content: string,
}

type images = {
    image: string,
}



async function post() {
    try{
        let posts : posts[]=[
            {title:"firstpost",content:"firstcontent"},
            {title:"secondpost",content:"secondcontent"}
        ]

        let images:images[]=[
            {image:"dummy1.jpg"},
            {image:"dummy2.jpg"}
        ]
        await pgClient.connect()

        for (let entry of posts){
            let postQueryResult = await pgClient.query
            ("INSERT INTO posts (title,content) VALUES ($1,$2) RETURNING id",[entry.title,entry.content])
            for (let imageItems of images){
                let imageQueryResult = await pgClient.query 
                ("INSERT INTO images (image) VALUES ($1) RETURNING id ",[imageItems.image])
            }
        }

        await pgClient.end()

    }catch(e){
        console.log("ERROR in post seed")
    }
    
}

post()

