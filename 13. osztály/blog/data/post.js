import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
    )`,
).run();

export const getPosts = () => db.prepare("SELECT * FROM posts").all();
export const getPostById = (id) => db.prepare("SELECT * FROM users WHERE id = ?").get(id);
export const savePost = (title, content) => db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)").run(title, content);
export const updatePost = (id, userId,  title, content) => db.prepare("UPDATE posts SET title = ?, content = ? WHERE id = ? AND WHERE userId = ?").run(title, content, id, userId) 
export const deletePost = (id) => db.prepare("DELETE FROM posts WHERE id = ?").run(id);
