import { Router } from 'express';
import * as db from "../data/post.js";


const router = Router();

router.get('/', (req, res) => {
    res.send('Posts');
});

router.get("/posts", (req ,res) => {
    const posts = db.getPosts()
    res.json(posts);
})

router.get("/posts/:id", (req ,res) => {
    const post = db.getPostById(+req.params.id);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }
    res.json(post);
})

router.post("/posts", (req, res) => {
    const {title, content} = req.body;
    if(!title || !content){
        return res.status(400).json({message: "Post title or content cannot be empty"});
    }
    const saved = db.savePost(title, content)
    const post = db.getPostById(saved.lastInsertRowid)
    res.status(201).json(post);
})

router.

export default router;