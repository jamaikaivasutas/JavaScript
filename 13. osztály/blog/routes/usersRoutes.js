import express from "express";
import bcrypt from "bcrypt";
import * as Users from "../data/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users");
});

router.post("/user", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required data" });
  }
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const saved = Users.saveUser(name, email, hashedPassword);
  const user = Users.getUserByid(saved.lastInsertRowid);
  delete user.password;
  res.status(200).json(user);
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing some required data" });
  }
  const user = Users.getUserByEamil(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { userId: user.id, userEmail: user.email },
    "secret_key",
    { expiresIn: "30m" }
  );
  res.json(token);
});

router.get("/me", (req, res) => {
  const user = Users.getUserByid(req.userId);
  delete user.password;
  res.json(user);
});

function auth(req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ message: "Unathorized" });
    }
    
    const token = jwt.verify(accessToken.split(" ")[1], "secret_key");
    const now = Math.floor(Date.now() / 1000);
    if (!token.exp || token.exp < now) {
      return res.status(403).json({ message: "Token expired" });
    }
    req.usersId = token.userId;
    req.userEmail = token.userEmail;

    next();
  } catch (err) {
    res.status;
  }
}
export default router;
