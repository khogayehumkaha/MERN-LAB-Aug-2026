const express = require("express");
const app = express();
app.use(express.json()); 

let items = [];
let id_counter = 1; 

// CREATE
app.post("/product", (req, res) => {
    const { name, description, price } = req.body;
    let newItem = { 
            id    : id_counter++,
            name  : name,
            description : description,
            price : price,
    };
    items.push(newItem);
    res.send(newItem);
});

// READ
app.get("/product", (req, res) => {
    res.json(items);
});

// UPDATE
app.put("/product/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const index = items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }
    
    items[index] = {
        id   : parseInt(id),
        name : name,
        description : description,
        price: price,
    };
    res.send("Updated Successfully");
});

// DELETE
app.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    const index = items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }
    items.splice(index, 1);
    res.send("Deleted Successfully");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});