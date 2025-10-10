import { Router } from "express";
import * as db from "../data/post.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Posts");
});

router.get("/posts", (req, res) => {
  const posts = db.getPosts();
  res.json(posts);
});

router.get("/posts/:id", (req, res) => {
  const post = db.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

router.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Post title or content cannot be empty" });
  }
  const saved = db.savePost(title, content);
  const post = db.getPostById(saved.lastInsertRowid);
  res.status(201).json(post);
});

router.put("/posts/:id", (req, res) => {
  const post = db.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  db.updatePost(id, userId, title, content);
  const updatedPost = db.getPostById(id);
  res.status(200).json(updatedPost);
});

router.delete("/posts/:id", (req, res) => {
  const post = db.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const result = db.deletePost(+req.params.id);
  res.status(200).json(result);
});

export default router;
