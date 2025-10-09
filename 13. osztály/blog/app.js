import express from 'express';
import cors from 'cors';
import postsRoutes from './routes/postsRoutes';
import usersRoutes from './routes/usersRoutes';
import user from "./data/user.js";

const PORT = 3000;
const app = express();


app.use(express.json());
app.use(cors());
app.use(express.static('public'));



app.listen(PORT, () =>  {
    console.log(`Server runs on port ${PORT}`);
}) 




