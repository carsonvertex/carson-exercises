import { Client } from "pg";
import dotenv from "dotenv";
import { hashPassword } from "../utils/hash";
dotenv.config();

let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

type users = {
    username: string,
    password: string,
};

async function seedUsers() {
    try {
        let users: users[] = [
            { username: "user1", password: "1234" },
            { username: "user2", password: "1234" }
        ];
        await pgClient.connect();

        for (let entry of users) {
            let hashed = await hashPassword(entry.password);

            await pgClient.query("INSERT INTO users (username, password) VALUES ($1, $2)", [entry.username, hashed]);
        }
        await pgClient.end();
    } catch (e) {
        console.log("ERROR in user seed:", e);
    }
}

seedUsers();