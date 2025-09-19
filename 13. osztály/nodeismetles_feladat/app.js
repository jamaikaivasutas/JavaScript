import express from "express";

const PORT = 3000;
const app  = express();
app.use(express.json());

const cars = [
    {id: 1, brand: "Peugeot", model : "Type V2C3"},
    {id: 2, brand: "Lamborghini", model: "Sian FKP 37"},
    {id: 3, brand: "Skoda", model: "Octavia"},
    {id: 4, brand: "Ford", model: "Focus"}
]

//GET
app.get("/cars", (req,res) =>{
    res.status(200).json(cars);
})

app.get("/cars/:id", (req,res) =>{
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id)
    if(!car){
        res.status(404).json({message: "Car not found."})
    }
    res.status(200).json(car);
})

//POST

app.post("/cars", (req,res) => {
    const {brand, model} = req.body;
    if(!brand || !model){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const id = cars.length ? cars[cars.length - 1].id + 1 : 1;
    const car = {id , brand, model};
    cars.push(car);
    res.status(201).json(car);
})

//PUT

app.put("/cars/:id", (req,res) => {
    const id = Number(req.params.id);
    let car = cars.find(car => car.id === id);
    if(!car){
        return res.status(404).json({message: "Car not found"});
    }
    const {brand, model} = req.body;
    if(!brand || !model){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const index = cars.indexOf(car);
    car = {
        id: car.id,
        brand: brand,
        model: model
    }
    cars[index] = car;
    res.status(200).json(car);
})

//DELETE

app.delete("/cars/:id", (req,res) => {
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id);
    if(!car){
        return res.status(404).json({message: "Car not found"})
    }
    const index = cars.indexOf(car);
    cars.splice(index, 1);
    res.status(200).json({message: "Deleted successfully"});
} )



app.listen(PORT, () =>{
    console.log(`Server runs on http://localhost:${PORT}`)
});