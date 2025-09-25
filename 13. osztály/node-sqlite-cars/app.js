//cars
//id, brand, model


import express from "express";
import * as db from "./util/database.js"

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/cars", (req, res) => {
    const cars = db.getCars();
    res.status(200).json(cars);
})

app.get("/cars/:id", (req, res) => {
    const car = db.getCarsById(+req.params.id);
    if (!car) {
        return res.status(400).json({message: "Car not found"})
    }
    res.status(200).json(car);
})

app.post("/cars", (req,res) => {
    const {brand, model} = req.body;
    if (!brand || !model) {
        return res.status(400).json({message: "Missing brand or model"})
    }
    const saveResult = db.saveCar(brand, model)
    if(!saveResult.changes) {
        return res.status(500).json({message: "Database Error"})
    }
    res.status(200).json(saveResult)
})

app.put("/cars/:id", (req, res) => {
    
})



app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`)
});
