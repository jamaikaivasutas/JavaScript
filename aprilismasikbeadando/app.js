import express from "express";
import { dbAll, initializeDatabse, dbGet, dbRun} from "./util/database.js";
import cors from "cors";

const app = express()
app.use(express.json())

app.use(cors())

app.get("/albums", async (req, res) =>
{
    const albums = await dbAll("SELECT * FROM albums");
    res.status(200).json(albums)
})

app.post("/albums", async (req, res) => {
    const {name, band, numberOfSongs, length} = req.body;
    if(!name || !band || !numberOfSongs || !length)
    {
        return res.status(404).json({message : "invalid data"})
    }
    const result = await dbRun('INSERT INTO albums(name, band, numberOfSongs, length) VALUES (?, ?, ?, ?);', [name, band, numberOfSongs, length]);

    res.status(201).json({id : result.lastID, name, band, numberOfSongs, length});
})

app.put('/albums/:id', async (req, res) =>
{
    const id = req.params.id;
    const album = await dbGet("SELECT * FROM albums WHERE id = ?;", [id])
    if(!album)
    {
        return res.status(404).json({message : "album not found"})
    }
    const {name, band, numberOfSongs,length} = req.body;
    if(!name || !band || !numberOfSongs || !length)
        {
            return res.status(404).json({message : "Missing data"})
        }
    dbRun("UPDATE albums SET name = ?, band = ?, numberOfSongs = ?, length = ?  WHERE id = ?;", [name, band, numberOfSongs,length, id])
    res.status(200).json({id, name, band, numberOfSongs, length})
})

app.delete('/albums/:id', async (req, res) =>
{
    const id = req.params.id;
    const album = await dbGet("SELECT * FROM albums WHERE id = ?;", [id])
    if(!album)
    {
        return res.status(404).json({message : "album not found"})
    }
    dbRun("DELETE FROM albums WHERE id = ?;", [id])
    res.status(200).json({message: "Delete successful"})
})

/*app.use((req, res, next, err) => {
    if(err)
    {
        res.status(500).json({message : `Error : ${err.message}`});
    }
})*/ 

async function startServer() {
    await initializeDatabse()
    app.listen(3000, ()=> {
        console.log("Server is running")
    })
}

startServer()