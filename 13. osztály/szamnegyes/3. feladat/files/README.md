# Fours Server

Simple Node.js server to store 4 numbers.

## Install & Run

```bash
npm install
npm start
```

## Endpoints

**GET /fours** - Get all  
**GET /fours/:id** - Get by ID  
**POST /fours** - Add new (send array of 4 numbers)

## Examples

```bash
# Add
curl -X POST http://localhost:3000/fours \
  -H "Content-Type: application/json" \
  -d '[1, 1, 1, 1]'

# Get all
curl http://localhost:3000/fours

# Get by ID
curl http://localhost:3000/fours/1

# Invalid (returns "Invalid data")
curl -X POST http://localhost:3000/fours \
  -H "Content-Type: application/json" \
  -d '[1, 2, 3]'
```
