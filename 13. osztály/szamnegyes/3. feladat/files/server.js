const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database
let fours = [];
let nextId = 1;

// GET /fours - Get all
app.get('/fours', (req, res) => {
    res.json(fours);
});

// GET /fours/:id - Get by ID
app.get('/fours/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = fours.find(f => f.id === id);
    
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    
    res.json(item.numbers);
});

// POST /fours - Add new
app.post('/fours', (req, res) => {
    const numbers = req.body;
    
    // Validate: must be array of exactly 4 numbers
    if (!Array.isArray(numbers) || numbers.length !== 4) {
        return res.status(400).send('Invalid data');
    }
    
    if (!numbers.every(num => typeof num === 'number')) {
        return res.status(400).send('Invalid data');
    }
    
    // Check if already exists
    const exists = fours.some(f => 
        JSON.stringify(f.numbers) === JSON.stringify(numbers)
    );
    
    if (exists) {
        return res.status(409).json({ message: 'Already exists' });
    }
    
    const newItem = {
        id: nextId++,
        numbers: numbers
    };
    
    fours.push(newItem);
    res.status(201).json(newItem);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
