import express from "express"
import cors from "cors"
import * as db from "./data/database.js"
import bcrypt from "bcrypt"

const PORT = 3000;

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.static('public'))

app.get("/users", (req,res) => {
    const users = db.getUsers()
    res.json(users)
})

app.get("/users/:id", (req, res) => {
    const user = db.getUserById()
    if(!user){
        res.status(404).json({message: "User not found!"})
    }
    res.json(user)
})

app.post("/users", (req, res) => {
    const {password, email} = req.body;
    if(!email || !password){
        res.status(400).json({message: "Invalid data"});
    }
    const salt = bcrypt.genSaltSync();
    const hashedPassword = salt.hashSync(password, salt);
    const saved = db.saveUser(email, hashedPassword);
    const user = db.getUserById(saved.lastInsertRowId);
    res.status(201).json(user);
})

app.post("/login", (req, res) => {})

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
})