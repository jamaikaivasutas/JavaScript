const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;
const JWT_SECRET = "secret";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({ error: "Username already exists" });
          }
          return res.status(500).json({ error: "Registration failed" });
        }
        res.status(201).json({
          message: "User registered successfully",
          userId: this.lastID,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      try {
        const validPassword = await bcrypt.compare(
          password,
          user.password_hash
        );
        if (!validPassword) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "24h" }
        );
        res.json({ token, username: user.username });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    }
  );
});

app.post("/api/notes", authenticateToken, (req, res) => {
  const { title, content, is_public } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  db.run(
    "INSERT INTO notes (user_id, title, content, is_public) VALUES (?, ?, ?, ?)",
    [userId, title, content, is_public ? 1 : 0],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to create note" });
      res
        .status(201)
        .json({ id: this.lastID, message: "Note created successfully" });
    }
  );
});

app.get("/api/notes", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT n.*, u.username 
          FROM notes n 
          JOIN users u ON n.user_id = u.id 
          WHERE n.is_public = 1 OR n.user_id = ?
          ORDER BY n.created_at DESC`,
    [userId],
    (err, notes) => {
      if (err) return res.status(500).json({ error: "Failed to fetch notes" });
      res.json(notes);
    }
  );
});

app.get("/api/notes/:id", authenticateToken, (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  db.get(
    `SELECT n.*, u.username 
          FROM notes n 
          JOIN users u ON n.user_id = u.id 
          WHERE n.id = ? AND (n.is_public = 1 OR n.user_id = ?)`,
    [noteId, userId],
    (err, note) => {
      if (err) return res.status(500).json({ error: "Failed to fetch note" });
      if (!note) return res.status(404).json({ error: "Note not found" });
      res.json(note);
    }
  );
});

app.put("/api/notes/:id", authenticateToken, (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  const { title, content, is_public } = req.body;

  db.run(
    `UPDATE notes 
          SET title = ?, content = ?, is_public = ? 
          WHERE id = ? AND user_id = ?`,
    [title, content, is_public ? 1 : 0, noteId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to update note" });
      if (this.changes === 0)
        return res
          .status(404)
          .json({ error: "Note not found or unauthorized" });
      res.json({ message: "Note updated successfully" });
    }
  );
});

app.delete("/api/notes/:id", authenticateToken, (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  db.run(
    "DELETE FROM notes WHERE id = ? AND user_id = ?",
    [noteId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to delete note" });
      if (this.changes === 0)
        return res
          .status(404)
          .json({ error: "Note not found or unauthorized" });
      res.json({ message: "Note deleted successfully" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
