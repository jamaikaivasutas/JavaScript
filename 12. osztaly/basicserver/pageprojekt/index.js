import express from "express";
import _dirname from "./util/rootpath.js";
import path from "path";
const app = express();

app.get('/index', (req, res) => {
  res.sendFile(path.join(_dirname, 'views', 'index.html'));
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
