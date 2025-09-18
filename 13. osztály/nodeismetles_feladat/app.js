import express from "express";

const PORT = 3000;
const app  = express();

let cars = [
    {id: 1, brand: "Peugeot", model : "Type V2C3"},
    {id: 2, brand: "Lamborghini", model: "Sian FKP 37"},
    {id: 3, brand: "Skoda", model: "Octavia"},
    {id: 4, brand: "Ford", model: "Focus"}
]

//GET
app.get("/cars", (req,res) =>{
    res.status(200).json(cars);
})

app.get("cars/:id", (req,res) =>{
    const id = +req.params.id;
    const car = cars.find(car => car.id === id)
    if(!car){
        res.status(404).json({message: "Car not found."})
    }
    res.status(200).json(cars);
})

//POST

app.post("/cars", (req,res) => {
    const {brand, model} = req.body
    if(!brand || !model){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const id = cars.length ? cars[cars.length - 1].id + 1 : 1;
    const car = {id , brand, model};
    cars.push(car);
    req.status(201).json(car);
})



app.listen(PORT, () =>{
    console.log(`Server runs on http://localhost:${PORT}`)
});